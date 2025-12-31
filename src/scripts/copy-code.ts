document.querySelectorAll("pre").forEach((pre) => {
  const button = document.createElement("button");
  button.textContent = "Copy";
  button.className =
    "absolute top-2 right-2 text-xs px-2 py-1 rounded bg-muted-foreground text-foreground";

  button.onclick = async () => {
    const code = pre.querySelector("code")?.innerText ?? "";
    await navigator.clipboard.writeText(code);
    button.textContent = "Copied!";
    setTimeout(() => (button.textContent = "Copy"), 1500);
  };

  pre.classList.add("relative");
  pre.appendChild(button);
});
