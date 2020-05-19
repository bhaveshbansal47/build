require('chromedriver');
let wd = require('selenium-webdriver');
let browser = new wd.Builder().forBrowser('chrome').build();
let robot = require("robotjs");

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );

    app.use(express.urlencoded());

    app.post('/comment', function(req, res){
        console.log(req.body);
        openwebsite(req.body.name);
    //     var newComment = {
    //       name: req.body.name,
    // email: req.body.email,
    // comment: req.body.comment,
    // channel: req.body.channel,
    // img_url: req.body.img_url
    //     }
    //     pusher.trigger(newComment.channel, 'new_comment', newComment);
    //     res.json({  created: true });
      });
      app.post('/play', function(req, res){
        console.log(req.body);
        playsong(req.body.name,req.body.song);
      });
      app.post('/sendto', function(req, res){
        console.log(req.body);
        sendmeassageto(req.body.username);
      });
      app.post('/send', function(req, res){
        console.log(req.body);
        sendmessage(req.body.msg);
      });
      module.exports = app;
      app.listen(8060);
async function playsong(platform,song){
    if(platform == "youtube"){
    await browser.findElement(wd.By.css(".topbar-icons.style-scope.ytd-masthead")).click();
    let input = await browser.findElement(wd.By.css("#search-input #search"));
    console.log(input);
    await input.sendKeys(song + wd.Key.ENTER);
    await browser.wait(wd.until.elementLocated(wd.By.css("ytd-video-renderer")));
    await browser.findElement(wd.By.css("ytd-video-renderer")).click();}
    if(platform == "saavn"){
        // await browser.findElement(wd.By.css(".site-message-btn")).click();
        let input = await browser.findElement(wd.By.css(".text.typeahead.tt-input"));
    console.log(input);
    await input.sendKeys(song + wd.Key.ENTER);
    robot.keyTap("down");
    robot.keyTap("down");
    await browser.wait(wd.until.elementLocated(wd.By.css(".art img")));
    await browser.findElement(wd.By.css(".art img")).click();
    }
}
async function openwebsite(name){
    let input = await browser.findElement(wd.By.css(".gLFyf.gsfi"));
    console.log(input);
    await input.sendKeys(name + wd.Key.ENTER);
    await browser.findElement(wd.By.css(".LC20lb.DKV0Md")).click();
    robot.keyTap("tab");
    if(name == "web whatsapp"){
        for(var i = 0; i< 9; i++){
            robot.keyTap("down");
        }
        let checked = await browser.findElement(wd.By.css("input")).getAttribute("checked");
        if(checked){
            await browser.findElement(wd.By.css("input")).click();
        }
    }
}

async function sendmeassageto(username){
    await browser.findElement(wd.By.css("span[data-icon='search']")).click();
    let input = await browser.findElement(wd.By.css("._2S1VP.copyable-text.selectable-text"));
    console.log(input);
    await input.sendKeys(username + wd.Key.ENTER);
}

async function sendmessage(msg){
    let input = await browser.findElements(wd.By.css("._2S1VP.copyable-text.selectable-text"));
    await input[1].sendKeys(msg + wd.Key.ENTER);
}

async function main() {
    await browser.manage().window().maximize();
    await browser.get('https://chrome.google.com/webstore/detail/iframe-allow/gifgpciglhhpmeefjdmlpboipkibhbjg?hl=en');
    await browser.wait(wd.until.elementLocated(wd.By.css('.dd-Va.g-c-wb.g-eg-ua-Uc-c-za.g-c-Oc-td-jb-oa.g-c')));
    await browser.findElement(wd.By.css('.dd-Va.g-c-wb.g-eg-ua-Uc-c-za.g-c-Oc-td-jb-oa.g-c')).click();
    setTimeout(function () {
        robot.keyTap('tab');
        robot.keyTap('enter');
        setTimeout(function(){
            next();
        },2000);
    }, 1000);
}
main();

async function next(){
    robot.mouseClick();
    robot.keyTap("f11");
    await browser.get('http://localhost:8060');
    await browser.findElement(wd.By.css("#jarvis")).click();
    setTimeout(function(){
        robot.keyTap("tab");
        robot.keyTap("enter");
    },1000);
    let frames = await browser.findElements(wd.By.css("iframe"));
    await browser.switchTo().frame(frames[0]);
}