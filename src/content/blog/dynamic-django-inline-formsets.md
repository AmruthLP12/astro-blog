---
title: Dynamic Django Inline Formsets With JavaScript
description: How to create dynamic Django Inline Formsets(Without Losing Your Sanity) with JavaScript
pubDate: 2026-02-02 17:00
updatedDate: 2026-02-02 17:00
tags:
  - django
  - javascript
  - forms
category: web
author: amruth-l-p
heroImageDark: ./images/django-dynamic-forms/dark.jpg
heroImageLight: ./images/django-dynamic-forms/light.jpg
---

# Dynamic Django Inline Formsets (Without Losing Your Sanity)

Managing related objects in Django—like **Employee → Dependents**—is a classic use case for **inline formsets**. Things get tricky when you want:

* Add/remove rows dynamically with JavaScript
* Avoid ugly DELETE checkboxes
* Keep Django validation happy
* Prevent mysterious errors like `{'id': ['This field is required.']}`

This post walks through a **clean, production‑ready pattern** for building a dynamic inline formset that *actually works*.

---

## 🧠 The Problem

Django inline formsets are powerful, but they assume:

* The server controls how many forms exist
* Form indexes are stable
* Field names follow a very strict convention

Once JavaScript starts adding/removing rows, it’s easy to:

* Break form field names
* Corrupt the hidden `id` field
* Trigger confusing validation errors

We’ll solve all of that.

---

## 🧱 Models (Assumed)

```python
Employee 1 ──── * Dependent
```

Each `Dependent` belongs to one `Employee`.

---

## 📝 The ModelForm

We start with a simple `ModelForm` and Tailwind‑friendly widgets.

```python
class DependentForm(forms.ModelForm):
    class Meta:
        model = Dependent
        fields = [
            "name",
            "relationship",
            "dob",
            "is_financially_dependent",
            "is_active",
        ]
        widgets = {
            "name": forms.TextInput(attrs={"class": "border rounded px-3 py-2 w-full"}),
            "relationship": forms.Select(attrs={"class": "border rounded px-3 py-2 w-full"}),
            "dob": forms.DateInput(attrs={"type": "date", "class": "border rounded px-3 py-2 w-full"}),
            "is_financially_dependent": forms.CheckboxInput(attrs={"class": "mr-2 h-4 w-4"}),
            "is_active": forms.CheckboxInput(attrs={"class": "mr-2 h-4 w-4"}),
        }
```

Nothing fancy here—just predictable markup.

---

## 🧩 The Inline Formset

We use `inlineformset_factory` with **no extra forms**, since JavaScript will handle additions.

```python
DependantFormSet = forms.inlineformset_factory(
    Employee,
    Dependent,
    form=DependentForm,
    extra=0,
    can_delete=True,
    min_num=0,
    validate_min=False,
)
```

### Why `extra=0`?

Because:

* Django renders only existing dependents
* JS clones `empty_form` when needed
* No duplicate blank rows on page load

---

## 🙈 Hiding the DELETE Checkbox (The Right Way)

We **do not remove** the `DELETE` field.

We hide it.

```python
class HiddenDeleteFormSet(DependantFormSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.forms:
            form.fields["DELETE"].widget = forms.CheckboxInput(attrs={"class": "hidden"})
```

Why?

* Django *requires* `DELETE` for formsets
* Removing it breaks deletion
* Hiding it keeps JS‑driven UX clean

Your JS simply checks it when the user clicks **Remove**.

---

## 🧭 The View (CBV Style)

We use a `TemplateView` with explicit POST handling.

```python
class DependentFormsetView(TemplateView):
    template_name = "employee/dynamic_formset.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        employee = get_object_or_404(Employee, pk=self.kwargs["pk"])

        if self.request.method == "POST":
            formset = HiddenDeleteFormSet(
                self.request.POST, instance=employee, prefix="dependents"
            )
        else:
            formset = HiddenDeleteFormSet(instance=employee, prefix="dependents")

        context.update({
            "employee": employee,
            "formset": formset,
        })
        return context

    def post(self, request, *args, **kwargs):
        employee = get_object_or_404(Employee, pk=self.kwargs["pk"])
        formset = HiddenDeleteFormSet(
            request.POST, instance=employee, prefix="dependents"
        )

        if formset.is_valid():
            formset.save()
            return redirect(
                reverse_lazy("employee:detail", kwargs={"pk": employee.pk})
            )

        return self.render_to_response(self.get_context_data())
```

### Key details

* ✅ Explicit `prefix="dependents"`
* ✅ Same prefix in JS
* ✅ Same prefix in template

Consistency matters.

---

## 🖼️ The Template

### Management form (mandatory)

```django
{{ formset.management_form }}
```

Never forget this. Ever.

---

### Rendering existing forms

```django
{% for form in formset %}
  <div class="dependents-row">
    {{ form.id }}
    {{ form.name }}
    {{ form.relationship }}
    {{ form.dob }}
    {{ form.is_financially_dependent }}
    {{ form.is_active }}
    {{ form.DELETE }}

    <button type="button" class="remove-dependents-row">Remove</button>
  </div>
{% endfor %}
```

⚠️ **Important**: `{{ form.id }}` must always be rendered—even for new forms.

---

### The empty form template

This is what JavaScript clones.

```django
<div class="empty-form hidden">
  <div class="dependents-row">
    {{ formset.empty_form.id }}
    {{ formset.empty_form.name }}
    {{ formset.empty_form.relationship }}
    {{ formset.empty_form.dob }}
    {{ formset.empty_form.is_financially_dependent }}
    {{ formset.empty_form.is_active }}

    <button type="button" class="remove-dependents-row">Remove</button>
  </div>
</div>
```

Notice:

* No DELETE field here (JS handles it)
* `__prefix__` stays untouched in the template

---

## HTML Template

```html
{# templates/employee/dynamic_formset.html #}
{% extends "base.html" %}

{% block title %}Manage Dependents{% endblock %}

{% block content %}

    {% if messages %}
        <div class="container mx-auto p-6 max-w-4xl">
            {% for message in messages %}
                <div class="alert alert-{{ message.tags }}">
                    {{ message }}
                </div>
            {% endfor %}
        </div>
    {% endif %}
    <div class="container mx-auto p-6 max-w-4xl">

        <h1 class="text-2xl font-bold mb-4">Dependents for {{ employee.name }}</h1>

        <form method="post" id="dependents-form">
            {% csrf_token %}

             <!-- Non-field Error Messages -->
            {% if form.non_field_errors %}
                <div class="bg-error/10 border-l-4 border-error/50 p-4 rounded-lg shadow-sm">
                    <div class="flex">
                        <i class="fas fa-exclamation-circle text-error mr-3"></i>
                        <div>
                            <h3 class="text-sm font-semibold text-error">Please correct the following errors:</h3>
                            <div class="mt-2 text-sm text-error/80">
                                {% for error in form.non_field_errors %}
                                    <p class="mt-1">{{ error }}</p>
                                {% endfor %}
                            </div>
                        </div>
                    </div>
                </div>
            {% endif %}

            {{ formset.management_form }}

        <!-- Formset wrapper -->
            <div id="dependents-formset-wrapper" class="space-y-2">
                {% for form in formset %}


                    <div class="dependents-row grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b border-gray-300/30 pb-4 mb-2">
                        {{ form.id }}

                        {{form.name}}
                        {{form.relationship}}
                        {{form.dob}}
                        {{form.is_financially_dependent}}
                        {{form.is_active}}
                        {{form.DELETE}}
                        <div class="flex items-center mt-4 md:mt-0">
                            <button type="button" class="remove-dependents-row px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>

                        </div>
                    </div>
                {% endfor %}
            </div>

        <!-- Hidden empty form template -->
            <div class="empty-form hidden">
                <div class="dependents-row grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b border-gray-300/30 pb-4 mb-2">
                    {{ formset.empty_form.id }}
                    {{formset.empty_form.name}}
                    {{formset.empty_form.relationship}}
                    {{formset.empty_form.dob}}
                    {{formset.empty_form.is_financially_dependent}}
                    {{formset.empty_form.is_active}}
                    <div class="flex items-center mt-4 md:mt-0">
                        <button type="button" class="remove-dependents-row px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                    </div>

                </div>
            </div>

        <!-- Add row button -->
            <button type="button" id="add-dependents-row" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4">
                Add Dependent
            </button>

        <!-- Submit -->
            <div>
                <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Save Dependents
                </button>
            </div>
        </form>
    </div>

<!-- Initialize dynamic formset -->
    <script>
        $(document).ready(function() {
            initDynamicFormset({
                formsetPrefix: "dependents",
                wrapperSelector: "#dependents-formset-wrapper",
                addButtonSelector: "#add-dependents-row",
                emptyFormSelector: ".empty-form .dependents-row",
                maxForms: 10
            });
        });

    </script>
{% endblock %}
```

---

## JavaScript

```javascript
/**
 * dynamic_formset.js
 * Reusable script to handle dynamic Django formsets (Add / Remove rows)
 *
 * Requirements to use this file:
 * 1. jQuery must be loaded before this script.
 * 2. Your template must have:
 *    - A wrapper for formset rows (e.g., <div id="sss-formset-wrapper">)
 *    - A hidden empty form template (e.g., <div class="empty-form"><div class="sss-row">{{ formset.empty_form }}</div></div>)
 *    - A management form with TOTAL_FORMS (generated by {{ formset.management_form }})
 *    - An "Add" button (e.g., <button id="add-sss-row">Add Row</button>)
 * 3. The wrapper, add button, and empty form selectors must be passed correctly to initDynamicFormset()
 *
 * Usage:
 *   initDynamicFormset({
 *       formsetPrefix: "sss",
 *       wrapperSelector: "#sss-formset-wrapper",
 *       addButtonSelector: "#add-sss-row",
 *       emptyFormSelector: ".empty-form .sss-row",
 *       maxForms: 20
 *   });
 */

function initDynamicFormset(options) {
    const {
        formsetPrefix,
        wrapperSelector,
        addButtonSelector,
        emptyFormSelector,
        maxForms = 20
    } = options;

    console.log(`Initializing dynamic formset for prefix "${formsetPrefix}"`);

    const wrapper = $(wrapperSelector);
    const addBtn = $(addButtonSelector);
    const totalFormsInput = $(`#id_${formsetPrefix}-TOTAL_FORMS`);
    const emptyFormTemplate = $(emptyFormSelector).html()?.trim();

    // --- Checks for required elements ---
    let hasErrors = false;
    if (!wrapper.length) {
        console.error("[DynamicFormset] Formset wrapper not found:", wrapperSelector);
        hasErrors = true;
    }
    if (!addBtn.length) {
        console.error("[DynamicFormset] Add button not found:", addButtonSelector);
        hasErrors = true;
    }
    if (!totalFormsInput.length) {
        console.error("[DynamicFormset] Management form TOTAL_FORMS input not found. Make sure {{ formset.management_form }} is included.");
        hasErrors = true;
    }
    if (!emptyFormTemplate) {
        console.error("[DynamicFormset] Empty form template not found or empty. Make sure your empty form selector is correct:", emptyFormSelector);
        hasErrors = true;
    }

    if (hasErrors) {
        console.warn("[DynamicFormset] Initialization aborted due to missing elements.");
        return;
    }

    console.log("[DynamicFormset] All required elements found. Ready to add/remove rows.");

    // --- Add new form ---
    addBtn.on("click", function () {
        let formCount = parseInt(totalFormsInput.val()) || 0;
        if (formCount >= maxForms) {
            alert(`[DynamicFormset] Maximum ${maxForms} entries allowed.`);
            return;
        }

        let newFormHtml = emptyFormTemplate.replace(/__prefix__/g, formCount);
        const prefixRegex = new RegExp(formsetPrefix + "-__prefix__", "g");
        newFormHtml = newFormHtml.replace(prefixRegex, `${formsetPrefix}-${formCount}`);

        wrapper.append(
            `<div class="${formsetPrefix}-row grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b border-border/30 pb-4 mb-2">
                ${newFormHtml}
            </div>`
        );

        totalFormsInput.val(formCount + 1);
        console.log(`[DynamicFormset] Added new row #${formCount}`);
    });

    // --- Soft delete (hide) rows ---
    $(document).on("change", `input[name^='${formsetPrefix}'][name$='-DELETE']`, function () {
        const $row = $(this).closest(`.${formsetPrefix}-row`);
        if (this.checked) {
            $row.hide();
            console.log(`[DynamicFormset] Row hidden due to DELETE checked`);
        } else {
            $row.show();
            console.log(`[DynamicFormset] Row restored`);
        }
    });

    $(document).on("click", `.remove-${formsetPrefix}-row`, function () {
    const $row = $(this).closest(`.${formsetPrefix}-row`);
    const deleteInput = $row.find("input[name$='-DELETE']");

    if (deleteInput.length) {
        deleteInput.val("on");  
    }

    $row.hide();
});
}
```

---

## 🚨 The Classic Bug (And Why This Works)

If you ever see:

```python
[{'id': ['This field is required.']}]
```

It almost always means:

> ❌ JavaScript broke the `id` field name

The fix:

* **Only replace `__prefix__`**
* **Never re‑add the formset prefix in JS**

Django already did that for you.

---

## ✅ Final Result

* Add dependents dynamically
* Remove dependents cleanly
* Hidden DELETE handling
* No validation errors
* Fully Django‑compliant

All without third‑party packages.

---

## 🏁 Takeaways

* Inline formsets are strict—but predictable
* Respect Django’s naming conventions
* Clone `empty_form`, don’t reinvent it
* Hide fields, don’t delete them

Once you understand these rules, dynamic formsets become boring—in the best possible way.

Happy shipping 🚀

---

## JavaScript Integration (Important)

Because this setup relies on **client-side dynamic formset management**, JavaScript **must be loaded in the correct order**. This is one of the most common reasons dynamic add/remove breaks even when Django code is correct.

### 1. Load jQuery First

If your dynamic formset script depends on jQuery (like in your case), **jQuery must be loaded before your custom JS file**.

Example (recommended in `base.html`):

```html
<!-- jQuery (must come first) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Your dynamic formset JS -->
<script src="{% static 'js/dynamic_formset.js' %}"></script>
```

⚠️ If jQuery loads **after** your script, you will see silent failures like:

* Add works but remove doesn’t
* DELETE flag not set
* TOTAL_FORMS not updating

---

### 2. Initialize JS After DOM Is Ready

Always initialize the formset **after the DOM is fully loaded**.

```html
<script>
  $(document).ready(function () {
    initDynamicFormset({
      formsetPrefix: "dependents",
      wrapperSelector: "#dependents-formset-wrapper",
      addButtonSelector: "#add-dependents-row",
      emptyFormSelector: ".empty-form .dependents-row",
      maxForms: 10,
    });
  });
</script>
```

---

## Where to Paste Your Full JavaScript

You have **two clean options**:

### Option 1: External JS File (Recommended)

Create:

```
static/js/dynamic_formset.js
```

Paste your **entire dynamic formset logic** there.

This keeps templates clean and avoids duplicate scripts.

---

### Option 2: Inline Script (Quick Debugging)

For quick testing or demos, you can paste the JS directly **at the bottom of the template**, just before `</body>`:

```html
<script>
// 👉 Paste full dynamic formset JS here
</script>
```

⚠️ Avoid mixing inline + external logic — pick one.

---

## HTML Template: Safe Placeholder for JS

Your template is already correctly structured. This is the **safe final placement** for JS:

```html
{% block extra_js %}
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="{% static 'js/dynamic_formset.js' %}"></script>

<script>
  $(document).ready(function () {
    initDynamicFormset({
      formsetPrefix: "dependents",
      wrapperSelector: "#dependents-formset-wrapper",
      addButtonSelector: "#add-dependents-row",
      emptyFormSelector: ".empty-form .dependents-row",
      maxForms: 10,
    });
  });
</script>
{% endblock %}
```

This ensures:

* jQuery loads first
* Your JS loads second
* Initialization runs last

---

## Final Checklist (Before You Debug for Hours)

✅ `{{ formset.management_form }}` is present

✅ `{{ form.id }}` is rendered for **every form**

✅ `can_delete=True` is enabled

✅ DELETE field exists (even if hidden)

✅ jQuery loads **before** your JS

✅ TOTAL_FORMS increments/decrements correctly

If all of the above are true — your dynamic formset will work reliably.

---

## Conclusion

Django inline formsets + JavaScript are powerful, but unforgiving.

Once you respect:

* **form IDs**
* **management form rules**
* **script loading order**

You get a clean, scalable UI without hacks or custom endpoints.

Happy building 


