const SHAPE_FILES = [
  "Profertil_Forma_Barras_Amarillo.svg",
  "Profertil_Forma_C_Amarillo.svg",
  "Profertil_Forma_Capas_Amarillo.svg",
  "Profertil_Forma_Casco_Amarillo.svg",
  "Profertil_Forma_Circulos_Amarillo.svg",
  "Profertil_Forma_Escudo_Amarillo.svg",
  "Profertil_Forma_Estrella_Amarillo.svg",
  "Profertil_Forma_Flor_Amarillo.svg",
  "Profertil_Forma_Grafico_Amarillo.svg",
  "Profertil_Forma_Hoja_Amarillo.svg",
  "Profertil_Forma_Industria_Amarillo.svg",
  "Profertil_Forma_Lupa_Amarillo.svg",
  "Profertil_Forma_Ondas_Amarillo.svg",
  "Profertil_Forma_Plantas_Amarillo.svg",
  "Profertil_Forma_Sol_Amarillo.svg",
  "Profertil_Forma_Suelo_Amarillo.svg",
  "Profertil_Forma_Trigo_Amarillo.svg",
  "Profertil_Forma_Urea_Amarillo.svg"
];

const PALETTES = [
  {
    id: "azul-celeste",
    name: "Azul / Celeste",
    figure: { name: "Azul", hex: "#003DA5" },
    background: { name: "Celeste", hex: "#4086FF" }
  },
  {
    id: "verde-verde-claro",
    name: "Verde / Verde claro",
    figure: { name: "Verde", hex: "#2D8035" },
    background: { name: "Verde claro", hex: "#5EB53A" }
  },
  {
    id: "amarillo-naranja",
    name: "Amarillo / Naranja",
    figure: { name: "Amarillo", hex: "#EABA2C" },
    background: { name: "Naranja", hex: "#E57F19" }
  },
  {
    id: "naranja-terra",
    name: "Naranja / Terra",
    figure: { name: "Naranja", hex: "#E57F19" },
    background: { name: "Terra", hex: "#8A4818" }
  }
];

const RATIOS = [
  { id: "1:1", label: "1:1", previewWidth: 1600, previewHeight: 1600, exportWidth: 1080, exportHeight: 1080 },
  { id: "16:9", label: "16:9", previewWidth: 1920, previewHeight: 1080, exportWidth: 1920, exportHeight: 1080 },
  { id: "5:4", label: "5:4", previewWidth: 1800, previewHeight: 1440, exportWidth: 1350, exportHeight: 1080 },
  { id: "9:16", label: "9:16", previewWidth: 1080, previewHeight: 1920, exportWidth: 1080, exportHeight: 1920 },
  { id: "A5", label: "A5", previewWidth: 1748, previewHeight: 2480, exportWidth: 1748, exportHeight: 2480 },
  { id: "A4", label: "A4", previewWidth: 2480, previewHeight: 3508, exportWidth: 2480, exportHeight: 3508 }
];

const LAYOUTS = [
  { id: "grid", label: "Grilla" },
  { id: "brick", label: "Ladrillo" },
  { id: "cluster", label: "Matriz" }
];

const DIRECTION_STEPS = [-90, 0, 90, 180];

const SLIDERS = [
  { id: "seed", label: "Semilla", min: 0, max: 100, step: 1, value: 37, suffix: "" },
  { id: "scale", label: "Escala", min: 12, max: 100, step: 1, value: 56, suffix: "%" },
  { id: "rhythmX", label: "Ritmo horizontal", min: 20, max: 200, step: 1, value: 110, suffix: "%" },
  { id: "rhythmY", label: "Ritmo vertical", min: 20, max: 200, step: 1, value: 110, suffix: "%" },
  { id: "direction", label: "Dirección", min: 0, max: 3, step: 1, value: 1, suffix: "" },
  { id: "directionEven", label: "Dirección par", min: 0, max: 3, step: 1, value: 1, suffix: "" },
  { id: "directionOdd", label: "Dirección impar", min: 0, max: 3, step: 1, value: 1, suffix: "" },
  { id: "stagger", label: "Desfase alternado", min: -60, max: 60, step: 1, value: 0, suffix: "%" },
  { id: "overlap", label: "Solapamiento", min: 0, max: 60, step: 1, value: 30, suffix: "%" }
];

const state = {
  shapes: [],
  shapeId: "Profertil_Forma_Barras_Amarillo.svg",
  paletteId: PALETTES[0].id,
  invertColors: false,
  ratioId: RATIOS[1].id,
  layoutId: LAYOUTS[1].id,
  exportFormat: "svg",
  lastRenderedRatioId: null,
  uiLayout: {
    sidebarSide: "left",
    dockPosition: "bottom",
    dockOrder: ["ratio", "export"]
  },
  controls: Object.fromEntries(SLIDERS.map((slider) => [slider.id, slider.value]))
};

const els = {
  appShell: document.querySelector("#app-shell"),
  sidebarModule: document.querySelector("#sidebar-module"),
  previewModule: document.querySelector("#preview-module"),
  dockModule: document.querySelector("#dock-module"),
  shapeSelect: document.querySelector("#shape-select"),
  shapePrev: document.querySelector("#shape-prev"),
  shapeNext: document.querySelector("#shape-next"),
  palettePrev: document.querySelector("#palette-prev"),
  paletteNext: document.querySelector("#palette-next"),
  colorSelectDisplay: document.querySelector("#color-select-display"),
  shapeThumb: document.querySelector("#shape-thumb"),
  shapeName: document.querySelector("#shape-name"),
  shapeDimensions: document.querySelector("#shape-dimensions"),
  paletteGrid: document.querySelector("#palette-grid"),
  invertColors: document.querySelector("#invert-colors"),
  layoutPills: document.querySelector("#layout-pills"),
  sliderStack: document.querySelector("#slider-stack"),
  previewStage: document.querySelector(".preview-stage"),
  previewFrame: document.querySelector("#preview-frame"),
  previewSurface: document.querySelector(".preview-surface"),
  previewSvg: document.querySelector("#preview-svg"),
  ratioDock: document.querySelector("#ratio-dock"),
  exportDock: document.querySelector("#export-dock"),
  ratioPills: document.querySelector("#ratio-pills"),
  exportFormatPills: document.querySelector("#export-format-pills"),
  exportButton: document.querySelector("#export-button")
};

function cleanShapeName(fileName) {
  return fileName
    .replace("Profertil_Forma_", "")
    .replace("_Amarillo.svg", "")
    .replaceAll("_", " ");
}

function updateStatus(text) {
  void text;
}

function seededNoise(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function loadSvgAsset(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "image/svg+xml");
  const svg = doc.querySelector("svg");
  const viewBox = (svg.getAttribute("viewBox") || "0 0 100 100").split(/\s+/).map(Number);

  svg.querySelectorAll("[fill]").forEach((node) => {
    if (node.getAttribute("fill") !== "none") {
      node.setAttribute("fill", "currentColor");
    }
  });

  svg.querySelectorAll("[stroke]").forEach((node) => {
    if (node.getAttribute("stroke") !== "none") {
      node.setAttribute("stroke", "currentColor");
    }
  });

  return {
    viewBox,
    innerMarkup: svg.innerHTML,
    width: viewBox[2],
    height: viewBox[3]
  };
}

async function fetchShapes() {
  const loaded = await Promise.all(
    SHAPE_FILES.map(async (fileName) => {
      const response = await fetch(`./public/shapes/${fileName}`);
      const text = await response.text();
      return {
        id: fileName,
        label: cleanShapeName(fileName),
        ...loadSvgAsset(text)
      };
    })
  );

  state.shapes = loaded;
}

function activeShape() {
  return state.shapes.find((shape) => shape.id === state.shapeId) || state.shapes[0];
}

function activePalette() {
  const pair = PALETTES.find((palette) => palette.id === state.paletteId) || PALETTES[0];

  if (state.invertColors) {
    return {
      figure: pair.background,
      background: pair.figure,
      pair
    };
  }

  return {
    figure: pair.figure,
    background: pair.background,
    pair
  };
}

function activeRatio() {
  return RATIOS.find((ratio) => ratio.id === state.ratioId) || RATIOS[0];
}

function activeLayout() {
  return LAYOUTS.find((layout) => layout.id === state.layoutId) || LAYOUTS[0];
}

function currentShapeIndex() {
  return state.shapes.findIndex((shape) => shape.id === state.shapeId);
}

function stepShape(direction) {
  const index = currentShapeIndex();
  if (index < 0) return;
  const nextIndex = (index + direction + state.shapes.length) % state.shapes.length;
  state.shapeId = state.shapes[nextIndex].id;
  els.shapeSelect.value = state.shapeId;
  render();
}

function buildShapeSelect() {
  els.shapeSelect.innerHTML = state.shapes
    .map((shape) => `<option value="${shape.id}">${shape.label}</option>`)
    .join("");

  els.shapeSelect.value = state.shapeId;
  els.shapeSelect.addEventListener("change", (event) => {
    state.shapeId = event.target.value;
    render();
  });

  els.shapePrev.addEventListener("click", () => stepShape(-1));
  els.shapeNext.addEventListener("click", () => stepShape(1));
}

function currentPaletteIndex() {
  return PALETTES.findIndex((palette) => palette.id === state.paletteId);
}

function stepPalette(direction) {
  const index = currentPaletteIndex();
  if (index < 0) return;
  const nextIndex = (index + direction + PALETTES.length) % PALETTES.length;
  state.paletteId = PALETTES[nextIndex].id;
  render();
}

function buildPaletteGrid() {
  els.paletteGrid.innerHTML = "";

  PALETTES.forEach((palette) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-option${palette.id === state.paletteId ? " is-active" : ""}`;
    button.setAttribute("aria-label", palette.name);
    button.title = palette.name;
    button.innerHTML = `
      <div class="palette-preview">
        <span style="background:${palette.figure.hex}"></span>
        <span style="background:${palette.background.hex}"></span>
      </div>
    `;
    button.addEventListener("click", () => {
      state.paletteId = palette.id;
      render();
    });
    els.paletteGrid.appendChild(button);
  });

  els.invertColors.checked = state.invertColors;
  els.invertColors.addEventListener("change", (event) => {
    state.invertColors = event.target.checked;
    render();
  });

  els.palettePrev.addEventListener("click", () => stepPalette(-1));
  els.paletteNext.addEventListener("click", () => stepPalette(1));
}

function buildSliders() {
  els.sliderStack.innerHTML = "";
  const layout = activeLayout();
  const visibleSlidersByLayout = {
    grid: ["scale", "rhythmX", "rhythmY", "direction", "overlap"],
    brick: ["scale", "rhythmX", "rhythmY", "directionEven", "directionOdd", "stagger", "overlap"],
    cluster: ["seed", "scale", "rhythmX", "rhythmY", "overlap"]
  };
  const visibleIds = visibleSlidersByLayout[layout.id] || [];

  SLIDERS.forEach((slider) => {
    if (!visibleIds.includes(slider.id)) return;
    if ((slider.id === "directionEven" || slider.id === "directionOdd") && layout.id === "brick" && slider.id === "directionEven" && state.controls.directionEven == null) {
      state.controls.directionEven = 1;
    }
    if ((slider.id === "directionEven" || slider.id === "directionOdd") && layout.id === "brick" && slider.id === "directionOdd" && state.controls.directionOdd == null) {
      state.controls.directionOdd = 1;
    }
    if (slider.id === "direction" && state.controls.direction == null) {
      state.controls.direction = 1;
    }
    const wrap = document.createElement("label");
    wrap.className = "slider-field";
    wrap.innerHTML = `
      <div class="slider-head">
        <strong>${slider.label}</strong>
        <span id="${slider.id}-value"></span>
      </div>
      <input
        id="${slider.id}"
        type="range"
        min="${slider.min}"
        max="${slider.max}"
        step="${slider.step}"
        value="${state.controls[slider.id]}"
      />
    `;

    const input = wrap.querySelector("input");
    const valueEl = wrap.querySelector("span");
    const syncValue = () => {
      if (slider.id === "direction" || slider.id === "directionEven" || slider.id === "directionOdd") {
        valueEl.textContent = `${DIRECTION_STEPS[state.controls[slider.id]]}°`;
        return;
      }

      valueEl.textContent = `${state.controls[slider.id]}${slider.suffix}`;
    };

    input.addEventListener("input", () => {
      state.controls[slider.id] = Number(input.value);
      syncValue();
      render();
    });

    syncValue();
    els.sliderStack.appendChild(wrap);
  });
}

function buildLayoutPills() {
  els.layoutPills.innerHTML = "";

  LAYOUTS.forEach((layout) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pill${layout.id === state.layoutId ? " is-active" : ""}`;
    button.textContent = layout.label;
    button.addEventListener("click", () => {
      state.layoutId = layout.id;
      buildSliders();
      render();
    });
    els.layoutPills.appendChild(button);
  });
}

function buildRatioPills() {
  els.ratioPills.innerHTML = "";

  RATIOS.forEach((ratio) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pill${ratio.id === state.ratioId ? " is-active" : ""}`;
    button.textContent = ratio.label;
    button.addEventListener("click", () => {
      state.ratioId = ratio.id;
      render();
    });
    els.ratioPills.appendChild(button);
  });
}

function buildExportPills() {
  ["svg", "png", "jpg"].forEach((format) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pill is-export${format === state.exportFormat ? " is-active" : ""}`;
    button.textContent = format.toUpperCase();
    button.addEventListener("click", () => {
      state.exportFormat = format;
      render();
    });
    els.exportFormatPills.appendChild(button);
  });
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildPatternSvgMarkup({ width, height }) {
  const shape = activeShape();
  const palette = activePalette();
  const layout = activeLayout();
  const controls = state.controls;
  const direction = DIRECTION_STEPS[controls.direction];
  const directionEven = DIRECTION_STEPS[controls.directionEven ?? 1];
  const directionOdd = DIRECTION_STEPS[controls.directionOdd ?? 1];
  const effectiveDirection = layout.id === "grid" ? direction : 0;
  const rhythmX = Math.max(0.2, controls.rhythmX / 100);
  const rhythmY = Math.max(0.2, controls.rhythmY / 100);
  const stagger = controls.stagger / 100;
  const overlap = controls.overlap / 100;
  const seed = controls.seed;
  const scaleFactor = 0.22 + (controls.scale / 100) * 1.08;
  const baseWidth = Math.max(shape.width * scaleFactor, 16);
  const baseHeight = Math.max(shape.height * scaleFactor, 16);
  const cellWidth = Math.max(baseWidth * rhythmX, 24);
  const cellHeight = Math.max(baseHeight * rhythmY, 24);
  const coverage = 0.68 + overlap * 0.95;
  const clusterSize = 2;
  const patternId = `shape-${shape.id.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  const renderModule = ({ x, y, cellW, cellH, rotation = 0, sizeMultiplier = 1 }) => {
    const innerWidth = Math.max(12, cellW * coverage * sizeMultiplier);
    const innerHeight = Math.max(12, cellH * coverage * sizeMultiplier);
    const localScale = Math.min(innerWidth / shape.width, innerHeight / shape.height);
    const centerX = x + cellW / 2;
    const centerY = y + cellH / 2;

    return `
      <g transform="translate(${centerX.toFixed(2)} ${centerY.toFixed(2)}) rotate(${rotation.toFixed(2)})">
        <g transform="scale(${localScale.toFixed(4)}) translate(${-shape.width / 2} ${-shape.height / 2})" fill="${palette.figure.hex}" color="${palette.figure.hex}">
          <use href="#${patternId}" />
        </g>
      </g>
    `;
  };

  if (layout.id === "cluster") {
    const cols = Math.ceil(width / cellWidth) + 4;
    const rows = Math.ceil(height / cellHeight) + 4;
    const startX = -cellWidth;
    const startY = -cellHeight;
    const occupancy = Array.from({ length: rows }, () => Array(cols).fill(false));
    const blocks = [];

    const canPlace = (startRow, startCol, blockSize) => {
      if (startRow + blockSize > rows || startCol + blockSize > cols) {
        return false;
      }

      for (let row = startRow; row < startRow + blockSize; row += 1) {
        for (let col = startCol; col < startCol + blockSize; col += 1) {
          if (occupancy[row][col]) {
            return false;
          }
        }
      }

      return true;
    };

    const placeBlock = (startRow, startCol, blockSize) => {
      for (let row = startRow; row < startRow + blockSize; row += 1) {
        for (let col = startCol; col < startCol + blockSize; col += 1) {
          occupancy[row][col] = true;
        }
      }

      blocks.push({ row: startRow, col: startCol, size: blockSize });
    };

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (occupancy[row][col]) {
          continue;
        }

        const canPlaceLarge = canPlace(row, col, clusterSize);
        const chance = seededNoise(seed * 101 + row * 17 + col * 29);

        if (canPlaceLarge && chance > 0.72) {
          placeBlock(row, col, clusterSize);
        } else {
          placeBlock(row, col, 1);
        }
      }
    }

    const renderedBlocks = blocks
      .map((block) =>
        renderModule({
          x: startX + cellWidth * block.col,
          y: startY + cellHeight * block.row,
          cellW: cellWidth * block.size,
          cellH: cellHeight * block.size,
          sizeMultiplier: block.size === 1 ? 1 : 0.96
        })
      )
      .join("");

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
        <defs>
          <g id="${patternId}">
            ${shape.innerMarkup}
          </g>
        </defs>
        <rect width="${width}" height="${height}" fill="${palette.background.hex}" />
        ${renderedBlocks}
      </svg>
    `.trim();
  }

  const cols = Math.ceil(width / cellWidth) + 4;
  const rows = Math.ceil(height / cellHeight) + 4;
  const startX = -cellWidth;
  const startY = -cellHeight;
  const renderedModules = [];

  for (let row = 0; row < rows; row += 1) {
    const isOddRow = row % 2 !== 0;
    const rowShift = layout.id === "brick" && isOddRow ? cellWidth * (0.5 + stagger * 0.5) : 0;
    const rotation = layout.id === "brick" ? (isOddRow ? directionOdd : directionEven) : effectiveDirection;

    for (let col = 0; col < cols; col += 1) {
      renderedModules.push(
        renderModule({
          x: startX + col * cellWidth + rowShift,
          y: startY + row * cellHeight,
          cellW: cellWidth,
          cellH: cellHeight,
          rotation
        })
      );
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <g id="${patternId}">
          ${shape.innerMarkup}
        </g>
      </defs>
      <rect width="${width}" height="${height}" fill="${palette.background.hex}" />
      ${renderedModules.join("")}
    </svg>
  `.trim();
}

function renderPreview() {
  const ratio = activeRatio();
  const palette = activePalette();
  const ratioChanged = state.lastRenderedRatioId !== null && state.lastRenderedRatioId !== ratio.id;
  const stageRect = els.previewStage.getBoundingClientRect();
  const framePadding = 32;
  const availableWidth = Math.max(320, stageRect.width - framePadding);
  const availableHeight = Math.max(240, stageRect.height - framePadding);
  const fittedScale = Math.min(availableWidth / ratio.previewWidth, availableHeight / ratio.previewHeight);
  const fittedWidth = Math.floor(ratio.previewWidth * fittedScale);
  const fittedHeight = Math.floor(ratio.previewHeight * fittedScale);

  els.previewFrame.style.width = `${fittedWidth}px`;
  els.previewFrame.style.height = `${fittedHeight}px`;
  els.previewFrame.style.aspectRatio = `${ratio.previewWidth} / ${ratio.previewHeight}`;
  els.previewSurface.style.background = palette.background.hex;
  els.previewSvg.setAttribute("viewBox", `0 0 ${ratio.previewWidth} ${ratio.previewHeight}`);
  els.previewSvg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  els.previewSvg.innerHTML = buildPatternSvgMarkup({ width: ratio.previewWidth, height: ratio.previewHeight })
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "");

  if (ratioChanged) {
    els.previewFrame.classList.remove("is-ratio-animating");
    void els.previewFrame.offsetWidth;
    els.previewFrame.classList.add("is-ratio-animating");
  }

  state.lastRenderedRatioId = ratio.id;
}

function renderShapeCard() {
  const shape = activeShape();
  const palette = activePalette();

  els.shapeName.textContent = shape.label;
  els.shapeDimensions.textContent = `${Math.round(shape.width)} × ${Math.round(shape.height)}`;
  els.shapeThumb.innerHTML = `
    <svg viewBox="${shape.viewBox.join(" ")}" style="color:${palette.figure.hex}">
      ${shape.innerMarkup}
    </svg>
  `;
}

function renderPaletteSummary() {
  const activePaletteIndex = currentPaletteIndex();
  const palette = PALETTES[activePaletteIndex] || PALETTES[0];

  els.colorSelectDisplay.innerHTML = `
    <div class="color-select-preview">
      <span style="background:${palette.figure.hex}"></span>
      <span style="background:${palette.background.hex}"></span>
    </div>
  `;

  [...els.paletteGrid.children].forEach((node, index) => {
    node.classList.toggle("is-active", PALETTES[index].id === state.paletteId);
  });
}

function renderRatioPills() {
  [...els.ratioPills.children].forEach((node, index) => {
    node.classList.toggle("is-active", RATIOS[index].id === state.ratioId);
  });
}

function renderLayoutPills() {
  [...els.layoutPills.children].forEach((node, index) => {
    node.classList.toggle("is-active", LAYOUTS[index].id === state.layoutId);
  });
}

function renderExportPills() {
  [...els.exportFormatPills.children].forEach((node) => {
    node.classList.toggle("is-active", node.textContent.toLowerCase() === state.exportFormat);
  });
}

function render() {
  renderShapeCard();
  renderPaletteSummary();
  renderLayoutPills();
  renderRatioPills();
  renderExportPills();
  renderPreview();
}

function applySlotLayout() {
  const sidebarLeft = state.uiLayout.sidebarSide === "left";
  const dockTop = state.uiLayout.dockPosition === "top";

  els.appShell.dataset.sidebarSide = state.uiLayout.sidebarSide;
  els.appShell.dataset.dockPosition = state.uiLayout.dockPosition;
  els.sidebarModule.style.gridColumn = sidebarLeft ? "1" : "2";
  els.previewModule.style.gridColumn = sidebarLeft ? "2" : "1";
  els.sidebarModule.style.gridRow = "2";
  els.previewModule.style.gridRow = "2";
  els.dockModule.style.gridColumn = "1 / -1";
  els.dockModule.style.gridRow = dockTop ? "1" : "3";

  state.uiLayout.dockOrder.forEach((dockId, index) => {
    const dockNode = dockId === "ratio" ? els.ratioDock : els.exportDock;
    dockNode.style.order = String(index + 1);
    dockNode.dataset.slot = index === 0 ? "left" : "right";
  });
}

function initDraggableSections() {
  const sections = [...document.querySelectorAll(".slot-item")];
  const edgeThreshold = 18;
  const viewportPadding = 24;
  const stagePadding = 12;
  const sidebarWidth = 340;
  let topZIndex = 20;

  const clearGuides = () => {
    document.querySelectorAll(".slot-guides").forEach((node) => node.remove());
  };

  const getShellMetrics = () => {
    const shellRect = els.appShell.getBoundingClientRect();
    const shellStyle = window.getComputedStyle(els.appShell);
    const paddingLeft = parseFloat(shellStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(shellStyle.paddingRight) || 0;
    const paddingTop = parseFloat(shellStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(shellStyle.paddingBottom) || 0;
    const gap = parseFloat(shellStyle.gap) || 20;
    const contentLeft = shellRect.left + paddingLeft;
    const contentTop = shellRect.top + paddingTop;
    const contentWidth = shellRect.width - paddingLeft - paddingRight;
    const contentHeight = shellRect.height - paddingTop - paddingBottom;
    const footerHeight = Math.max(els.dockModule.getBoundingClientRect().height, 88);
    const mainHeight = Math.max(240, contentHeight - footerHeight - gap);
    const wideWidth = Math.max(280, contentWidth - sidebarWidth - gap);
    const topDockTop = contentTop;
    const bottomDockTop = contentTop + contentHeight - footerHeight;
    const mainTop = state.uiLayout.dockPosition === "top" ? topDockTop + footerHeight + gap : contentTop;

    return {
      contentLeft,
      contentTop,
      contentWidth,
      contentHeight,
      footerHeight,
      mainHeight,
      gap,
      wideWidth,
      mainTop,
      topDockTop,
      bottomDockTop
    };
  };

  const allowedModuleSlots = {
    sidebar: ["left", "right"],
    preview: ["left", "right"],
    dock: ["top", "bottom"]
  };

  const buildSlotCache = (group, itemKey, draggedRect, moduleId) => {
    if (group === "module") {
      const metrics = getShellMetrics();
      if (moduleId === "sidebar") {
        return [
          {
            id: "left",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + stagePadding,
              top: metrics.mainTop + stagePadding,
              width: sidebarWidth - stagePadding * 2,
              height: metrics.mainHeight - stagePadding * 2
            }
          },
          {
            id: "right",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + metrics.wideWidth + metrics.gap + stagePadding,
              top: metrics.mainTop + stagePadding,
              width: sidebarWidth - stagePadding * 2,
              height: metrics.mainHeight - stagePadding * 2
            }
          }
        ];
      }

      if (moduleId === "preview") {
        return [
          {
            id: "left",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + stagePadding,
              top: metrics.mainTop + stagePadding,
              width: metrics.wideWidth - stagePadding * 2,
              height: metrics.mainHeight - stagePadding * 2
            }
          },
          {
            id: "right",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + sidebarWidth + metrics.gap + stagePadding,
              top: metrics.mainTop + stagePadding,
              width: metrics.wideWidth - stagePadding * 2,
              height: metrics.mainHeight - stagePadding * 2
            }
          }
        ];
      }

      if (moduleId === "dock") {
        const guideWidth = Math.min(draggedRect.width, metrics.contentWidth - stagePadding * 2);
        return [
          {
            id: "top",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + (metrics.contentWidth - guideWidth) / 2,
              top: metrics.topDockTop,
              width: guideWidth,
              height: metrics.footerHeight
            }
          },
          {
            id: "bottom",
            container: els.appShell,
            rect: {
              left: metrics.contentLeft + (metrics.contentWidth - guideWidth) / 2,
              top: metrics.bottomDockTop,
              width: guideWidth,
              height: metrics.footerHeight
            }
          }
        ];
      }
    }

    return [];
  };

  const buildGuides = (cachedSlots, group) => {
    clearGuides();
    const containers = [...new Set(cachedSlots.map((slot) => slot.container))];

    containers.forEach((container) => {
      const guides = document.createElement("div");
      guides.className = "slot-guides is-visible";
      container.appendChild(guides);
    });

    cachedSlots.forEach((slot) => {
      const guides = [...slot.container.children].find((child) => child.classList?.contains("slot-guides"));
      const guide = document.createElement("div");
      const rect = slot.rect;
      const containerRect = slot.container.getBoundingClientRect();
      guide.className = "slot-guide";
      guide.dataset.group = group;
      guide.dataset.slotId = slot.id;
      guide.style.left = `${rect.left - containerRect.left}px`;
      guide.style.top = `${rect.top - containerRect.top}px`;
      guide.style.width = `${rect.width}px`;
      guide.style.height = `${rect.height}px`;
      guides.appendChild(guide);
      slot.node = guide;
    });

    return cachedSlots;
  };

  const pointInsideRect = (x, y, rect) =>
    x >= rect.left &&
    x <= rect.left + rect.width &&
    y >= rect.top &&
    y <= rect.top + rect.height;

  const getActiveSlot = (x, y, cachedSlots) => {
    const directHit = cachedSlots.find((slot) => pointInsideRect(x, y, slot.rect));
    if (directHit) {
      return directHit;
    }

    let closestSlot = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cachedSlots.forEach((slot) => {
      const centerX = slot.rect.left + slot.rect.width / 2;
      const centerY = slot.rect.top + slot.rect.height / 2;
      const distance = Math.hypot(x - centerX, y - centerY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlot = slot;
      }
    });

    return closestSlot;
  };

  const updateUIState = (group, slotId, itemKey, moduleId) => {
    if (group === "module") {
      if (moduleId === "sidebar") {
        state.uiLayout.sidebarSide = slotId;
        return;
      }

      if (moduleId === "preview") {
        state.uiLayout.sidebarSide = slotId === "left" ? "right" : "left";
        return;
      }

      if (moduleId === "dock") {
        state.uiLayout.dockPosition = slotId;
      }
    }
  };

  sections.forEach((section) => {
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let sectionRect = null;
    let activeSlots = [];
    let activeSlotId = null;

    const applyTransform = () => {
      section.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const resetTransform = () => {
      pointerId = null;
      currentX = 0;
      currentY = 0;
      sectionRect = null;
      activeSlotId = null;
      activeSlots = [];
      section.classList.remove("is-dragging");
      section.style.transform = "";
      document.body.classList.remove("is-dragging-ui");
      delete document.body.dataset.dragGroup;
      clearGuides();
    };

    section.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".slot-item") !== section) {
        return;
      }

      const interactiveTarget = event.target.closest("button, input, select, label");
      const rect = section.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const nearEdge =
        offsetX <= edgeThreshold ||
        offsetX >= rect.width - edgeThreshold ||
        offsetY <= edgeThreshold ||
        offsetY >= rect.height - edgeThreshold;

      if (!nearEdge || interactiveTarget) {
        return;
      }

      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      sectionRect = section.getBoundingClientRect();
      activeSlots = buildGuides(buildSlotCache(section.dataset.slotGroup, section.dataset.slotKey, sectionRect, section.dataset.moduleId), section.dataset.slotGroup);
      topZIndex += 1;
      section.style.zIndex = String(topZIndex);
      section.classList.add("is-dragging");
      document.body.classList.add("is-dragging-ui");
      document.body.dataset.dragGroup = section.dataset.slotGroup;
      section.setPointerCapture(pointerId);
    });

    section.addEventListener("pointermove", (event) => {
      if (pointerId !== event.pointerId) {
        return;
      }

      const nextX = (event.clientX - startX) * 0.95;
      const nextY = (event.clientY - startY) * 0.95;
      const minX = viewportPadding - sectionRect.left;
      const maxX = window.innerWidth - viewportPadding - sectionRect.right;
      const minY = viewportPadding - sectionRect.top;
      const maxY = window.innerHeight - viewportPadding - sectionRect.bottom;

      currentX = Math.max(minX, Math.min(maxX, nextX));
      currentY = Math.max(minY, Math.min(maxY, nextY));
      applyTransform();

      const closestSlot = getActiveSlot(event.clientX, event.clientY, activeSlots);
      activeSlotId = closestSlot?.id ?? null;
      activeSlots.forEach((slot) => slot.node?.classList.toggle("is-target", slot.id === activeSlotId));
    });

    section.addEventListener("pointerup", (event) => {
      if (pointerId !== event.pointerId) {
        return;
      }

      section.releasePointerCapture(pointerId);
      if (activeSlotId) {
        updateUIState(section.dataset.slotGroup, activeSlotId, section.dataset.slotKey, section.dataset.moduleId);
        applySlotLayout();
      }
      resetTransform();
    });

    section.addEventListener("pointercancel", () => {
      if (pointerId == null) {
        return;
      }

      resetTransform();
    });
  });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function rasterizeSvg(svgMarkup, width, height) {
  const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = "async";

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function exportCurrentPattern() {
  const ratio = activeRatio();
  const baseName = `profertil-pattern-${activeShape().label.toLowerCase().replaceAll(" ", "-")}-${ratio.id.replace(":", "x")}`;
  const svgMarkup = buildPatternSvgMarkup({ width: ratio.exportWidth, height: ratio.exportHeight });

  updateStatus("Exportando...");

  try {
    if (state.exportFormat === "svg") {
      downloadBlob(new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" }), `${baseName}.svg`);
      return;
    }

    const canvas = await rasterizeSvg(svgMarkup, ratio.exportWidth, ratio.exportHeight);

    if (state.exportFormat === "png") {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      downloadBlob(blob, `${baseName}.png`);
      return;
    }

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    downloadBlob(blob, `${baseName}.jpg`);
  } finally {
    updateStatus("Listo");
  }
}

async function init() {
  updateStatus("Cargando formas...");
  await fetchShapes();
  applySlotLayout();
  buildShapeSelect();
  buildPaletteGrid();
  buildLayoutPills();
  buildSliders();
  buildRatioPills();
  buildExportPills();
  els.exportButton.addEventListener("click", exportCurrentPattern);
  initDraggableSections();
  window.addEventListener("resize", render);
  render();
  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
  updateStatus("Listo");
}

init().catch((error) => {
  console.error(error);
  updateStatus("Error");
});
