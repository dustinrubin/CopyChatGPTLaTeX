class copyLaTeXGPT {
  constructor() {
    this.enableObserver();
  }

  enableObserver() {
    setInterval(this.createCopyEquationButtons.bind(this), 1000);
  }

  createCopyEquationButtons() {
    const equations = Array.from(document.querySelectorAll(".katex:not(.copy-bound)"));

    equations.forEach(equation => {
      equation.style.cursor = "pointer";
      equation.classList.add("copy-bound"); // Add a class to mark this element as having an event listener attached

      equation.addEventListener("mouseover", () => {
        equation.style.border = "1px solid #000";
        equation.style.paddingTop = "2px";
        equation.style.paddingRight = "2px";
        equation.style.paddingBottom = "2px";
        equation.style.paddingLeft = "0";
      });

      equation.addEventListener("mouseout", () => {
        equation.style.border = "";
        equation.style.padding = "";
      });

      equation.addEventListener("click", (e) => {
        const text = equation.querySelector(".katex-mathml annotation").innerHTML;
        navigator.clipboard.writeText(`$$${text}$$`).then(() => {
          this.showPopup("Copied LaTeX", e.clientX, e.clientY);
        }).catch(err => {
          console.error('Failed to write text: ', err);
        });
      });
    });
  }

  showPopup(message, x, y) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.backgroundColor = "#333";
    popup.style.color = "#fff";
    popup.style.padding = "5px 10px";
    popup.style.borderRadius = "3px";
    popup.style.zIndex = "10000";
    popup.style.textAlign = "center";
    popup.style.fontSize = "14px";
    popup.style.fontWeight = "bold";
    popup.style.whiteSpace = "nowrap";
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 2000);
  }
}

const copyLaTeXGPTInstance = new copyLaTeXGPT();
