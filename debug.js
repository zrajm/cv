/* -*- js-indent-level:2;css-indent-offset:2-*- */

const root = document.documentElement
const cs   = getComputedStyle(root)

root.classList.add('DEBUG')
root.style.setProperty('--debug-fs', cs.fontSize)
root.style.setProperty('--debug-lh', cs.lineHeight)

document.body.insertAdjacentHTML('beforeend', `
<style>
  @media screen {
    html {
      font-size:   var(--debug-fs) !important;
      line-height: var(--debug-lh) !important;
    }
  }
  #debug-form {
    @media print { display: none }
    position: fixed; top: 8px; right: 8px; z-index: 99999;
    background: #000; border: 1px solid #8088; border-radius: 8px;
    padding: 8px; font: 16px/1.25 sans; color: #888;
    box-shadow: 0 0 8px #000;
    label {
      display: flex; flex-flow: wrap; justify-content: space-between;
      width: 17ch;
      input[type="range"] {
        flex-basis: 100%;
        margin: 2px 0 16px 0;
      }
    }
  }
</style>
<div id="debug-form">
  <label>font-size: <span id="debug-fs-val"></span>
      <input id="debug-fs" type="range" min="8" max="48" step="1">
  </label>
  <label>line-height: <span id="debug-lh-val"></span>
    <input id="debug-lh" type="range">
  </label>
  <label>show lines: <input id="debug-toggle" type="checkbox"></label>
</div>
`)

const fs     = document.getElementById('debug-fs')
const lh     = document.getElementById('debug-lh')
const fsVal  = document.getElementById('debug-fs-val')
const lhVal  = document.getElementById('debug-lh-val')
const toggle = document.getElementById('debug-toggle')

const fsNum = parseFloat(cs.getPropertyValue('--root-font-size').trim())
const lhNum = parseFloat(cs.getPropertyValue('--root-line-height').trim())

lh.min = 8; lh.max = 80; lh.step = 1; lh.value = lhNum

fs.value = fsNum
toggle.checked = root.classList.contains('DEBUG')

function apply() {
  root.style.setProperty('--debug-fs', fs.value + 'px')
  root.style.setProperty('--debug-lh', lh.value + 'px')
  fsVal.textContent = fs.value + 'px'
  lhVal.textContent = lh.value + 'px'
}

fs.oninput = lh.oninput = apply
toggle.onchange = () => root.classList.toggle('DEBUG', toggle.checked)
apply()

//EOF
