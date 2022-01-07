let myLeads = []
let inputEl = document.getElementById("input-el")
let saveBtn = document.getElementById("save-btn")
let saveTab = document.getElementById("save-tab")
let deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
let leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadFromLocalStorage) {
    myLeads = leadFromLocalStorage
    render(myLeads)
}   

saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    });
})

saveBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value) // add leads to the myLeads array
    inputEl.value = "" // set input feild to blank after SAVE INPUT is clicked 
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) // save leads to local storage
    render(myLeads) 
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
    console.log("delete clicked");
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a href='${leads[i]}' target='_blank'>
                            ${leads[i]}
                        </a>
                    </li>`
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}
