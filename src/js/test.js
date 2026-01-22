function addEventListeners() {
    const sectionIds = ["hero", "components", "details", "valuation"];

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        const controls = document.createElement("div");
        controls.style.display = "flex";
        controls.style.flexDirection = "column";
        controls.style.gap = "5px";

        const fileInput = document.createElement("input");
        fileInput.type = "file";

        const grayscaleInput = document.createElement("input");
        grayscaleInput.type = "range";
        grayscaleInput.min = "0"; grayscaleInput.max = "100"; grayscaleInput.value = "0";

        let imageUrl = "";

        const updateStyles = () => {
            if (imageUrl) {
                section.style.backgroundImage = `url(${imageUrl})`;
            }
            section.style.filter = `grayscale(${grayscaleInput.value}%)`;
        };

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                imageUrl = URL.createObjectURL(file);
                updateStyles();
            }
        });

        grayscaleInput.addEventListener("input", updateStyles);

        controls.append("File:", fileInput, "Grayscale:", grayscaleInput);
        section.appendChild(controls);
    });
}

addEventListeners();
