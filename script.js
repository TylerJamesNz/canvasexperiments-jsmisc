//Backstretch

//Nav
var navLinks = document.getElementsByClassName("navLink");
var colorArray = ["#D626DA", "#EA510E", "#B2748F", "#CA0E5D", "#AD26BA", "#E6C313", "#B9B03E", "#DF2F48", "#C71C2F",
		"#B7B3F1", "#B0D241", "#ACF000", "#BE5322", "#B38544", "#E5AB23", "#AEDA93"
];
var fadeTimer = 0;
var fadeInterval = 75;
var fadeLenth = 750;
for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].onmouseover = function() {
		this.style.backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)];
		this.opacity = 0.5;
	}
	navLinks[i].onmouseout = function() {
		this.style.backgroundColor = "transparent";
		this.opacity = 1;
	}
}
//Content animations
$(".expDescription").each(function() {
	$(this).css("margin-top", "68%");
	$(this).parent().hover(function() {
		$(this).children("p").eq(1).css({
			marginTop: "3em",
			transition: "all 0.5s linear"
		});
	}, function() {
		$(this).children("p").eq(1).css({
			marginTop: "68%",
			transition: "all 0.5s linear"
		});
	});
});
$(".canvasExperiment").each(function() {
	$(this).fadeOut(0).delay(fadeTimer).fadeIn(fadeLenth);
	fadeTimer += fadeInterval;
});
//Scrolling
$("a").click(function(){
    $("html, body").animate({
        scrollTop: $( $(this).attr("href") ).offset().top
    }, 750);
    return false;
});
//Canvas
$("canvas").css("background-color","#000");
//Form Stuff
//hide all the 
$(".errorMessage").each(function(){$(this).hide();});
$(".successMessage").each(function(){$(this).hide();});

nameInput = $("#name");
nameMessage = $("#nameMessage");
emailInput = $("#email");
emailMessage = $("#emailMessage");
messageInput = $("#message");
textMessage = $("#textMessage");
successMessage = $("#successMessage");
var emailPattern = new RegExp("^[_A-z0-9-]+(\.[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$");
function postSubmit(){
	var formValid = true;
	if(nameInput.val() == ""){
		nameMessage.slideDown(750);
		formValid = false;
	}else{
		nameMessage.slideUp(300);
	}
	if(emailInput.val() == ""){
		emailMessage.slideDown(750);
		formValid = false;
	}else{
		emailMessage.slideUp(300);
	}
	if(!emailPattern.test(emailInput.val()) || emailInput.val() == ""){
		emailMessage.slideDown(750);
		formValid = false;
		emailMessage.html("<p>Thats not a valid email address !</p>");
	}else{
		emailMessage.slideUp(300);
	}
	if(messageInput.val() == ""){
		textMessage.slideDown(750);
		formValid = false;
	}else{
		textMessage.slideUp(300);
	}
	if(formValid){
		successMessage.slideDown(750);
	}else{
		successMessage.slideUp(300);
	}
	return false;
}