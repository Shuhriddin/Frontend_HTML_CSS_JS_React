let option = {
    startAngle: -1.55,
    size: 150,
    value: 0.85,
    fill: {gradient: ["#f02", "#1d2127"]}
}
$(".circle .bar").circleProgress(option).on("circle-animation-progress", function(event, progress, stepValue){
    $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%")
});
$('.js .bar').circleProgress({
    value: 0.70,
})
$('.py .bar').circleProgress({
    value: 0.60,
})