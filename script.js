// Setting Variables
const cardList = document.querySelector("#cardList")
const tagList = document.querySelector("#tagList")

var tags = [["abc","#e20124"], ["def","#547a9d"], ["ghi","#124e20"], ["jkl","#aef120"]]

const cards = [
  {
    "displayName": "Google Search",
    "url": "http://google.com",
    "tags": [0, 1]
  },
  {
    "displayName": "Youtube",
    "url": "http://youtube.com",
    "tags": [2, 3]
  },
]

// Random Int
function randInt(min,max){ return Math.floor( Math.random() * (max-min+1) )+min }

// Colour Conversion
function hexToRGB(hex){
  hex = hex[0] == "#" ? hex.slice(1,7) : hex
  
  r = parseInt(hex.slice(0,2), 16)
  g = parseInt(hex.slice(2,4), 16)
  b = parseInt(hex.slice(4,6), 16)

  return ([r, g, b])
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex([r, g, b]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Contrast Function
function getTextColor(bgColor) {
  if (bgColor[0]*0.299 + bgColor[1]*0.587 + bgColor[2]*0.114 > 186) {
    return "#000000"
  } else {
    return "#ffffff"
  }
}

// Tag Creation Function
function createTag(tag, colorPicker=false) {
  if (typeof(tag) === 'object') {
    tagName = tag[0]
    tagColor = tag[1]
  } else {
    tagName = tags[tag][0]
    tagColor = tags[tag][1]
  }

  var tagElem = document.createElement("div")
  tagElem.classList.add("tag")
  tagElem.innerText = tagName

  tagElem.style.backgroundColor = tagColor
  tagElem.style.color = getTextColor( hexToRGB(tagColor) )
  
  if (colorPicker) {
    var colorPickerElem = document.createElement("input")
    
    colorPickerElem.type = "color"
    colorPickerElem.value = tagColor

    colorPickerElem.onchange = function(e) {
      console.log(colorPickerElem.value)
      
    }
    tagElem.append(colorPickerElem)
  }

  return tagElem
}

// Display Cards
cards.forEach(card => {
  var cardElem = document.createElement("a")
  cardElem.classList.add("card")
  // cardElem.setAttribute("href", card["url"])
  cardElem.setAttribute("draggable", "false")
  
  var cardTitle = document.createElement("div")
  cardTitle.classList.add("cardTitle")
  cardTitle.innerText = card["displayName"] + " "
  
  var tagElems = []
  card["tags"].forEach(tag => {
    var tagElem = createTag(tag)
    tagElems.push(tagElem)
  })
  cardTitle.append(...tagElems)
  
  var cardText = document.createElement("span")
  cardText.classList.add("cardText")
  cardText.innerText = card["url"]
  
  cardElem.append(cardTitle)
  cardElem.append(cardText)

  cardList.append(cardElem)
});

// Tag Functionality
function newTag() {
  var tagName = prompt("Enter Tag Name:")
  if (!tagName.trim()) return
  var randomColor = [ randInt(0, 255), randInt(0, 255), randInt(0, 255) ]
  randomColor = rgbToHex(randomColor)
  
  tagData = [tagName, randomColor]
  tags.push(tagData)

  var tag = createTag(tagData, colorPicker=true)
  tagList.append(tag)
}