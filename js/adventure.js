

var nicer = function()
{
  var t =document.getElementById("title");
  t.innerText = "I like you <3";

  var p = document.getElementById("par1");
  p.setAttribute("onclick","step1()");
}
var step1 = function()
{
  var p = document.getElementById("par1");
  p.innerText="Stay with me ;(";

  var fireButton = document.getElementById("fireButton");
  fireButton.removeAttribute("disabled");
}
var fire = function()
{
  var fireButton = document.getElementById("fireButton");
  var p = document.createElement("p");
  p.innerText="Please don't Fire";
  fireButton.after(p);

}
