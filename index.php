<?php include_once('_ascii.php') ?>

<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Ellen & Shin – We’re getting married!</title>
  <meta name="designer" content="UPRISE" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!-- ::: Webfonts :::::::::: -->
  <link href='http://fonts.googleapis.com/css?family=Trocchi' rel='stylesheet' type='text/css'>

<!-- ::: CSS :::::::::: -->
  <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <link rel="stylesheet" href="css/style.css" type="text/css" />
  <link rel="stylesheet" href="css/print.css" type="text/css" media="print"/>
  <!--[if lt IE 9]><link rel="stylesheet" href="css/iefix.css" type="text/css" /><![endif]-->

<!-- ::: Favicons :::::::::: -->
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon-precomposed" href="assets/apple-touch-icon.png"/>

<!-- ::: iOS ::::::::: -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- ::: JS ::::::::: -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="vendor/js/jquery-1.8.1.min.js"><\/script>')</script>
  <script src="vendor/js/plugins.js"></script>
  <script type="text/javascript" charset="utf-8">
  /*
    $(window).load(function() {
      $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false
      }).pause();
    });*/
  </script>

<!-- ::: Analytics :::::::::: -->


</head>
<body class="">
  <!--[if lt IE 7]>
    <p class="chromeframe">Warning! Your developer friend is in pain because you didn't upgrade your browser! Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
  <![endif]-->
<noscript>
<div class="no-js">
  Your browser does not support JavaScript! <br>This website is best viewed with Javascript on. Please enable JavaScript in your browser settings or update your browser.
</div>
</noscript>



<div id="the-wrapper">


  <div id="the-tree" class="show-lines">
    <?php include_once('_svg-tree.php') ?>
  </div>

  <hgroup>
    <h1 class="ellen-and-shin">Ellen & Shin</h1>
    <h2>We’re tying the knot!</h2>
  </hgroup>

</div>

<?php include_once('_popup.php') ?>

<div id="story-of-two">
  <ul class="">
    <li class="card text first-met current">
      <h3>First met, 2006, Shanghai</h3>
      <p>It all started on the internet. Ellen and Shin knew each other in a chatroom of a game forum, and soon met offline. The chatroom group turned out to be way more close-knit than others. People hung out all the time and became friends for life.</p>
    </li>

    <li class="card text move-apart next">
        <h3>The world’s largest metropolis v.s<br/>the world’s coolest little capital</h3>
        <p>Then in 2007, Shin moved to Japan, while Ellen moved to New Zealand in 2009. Life continued and they kept friendship alive over the internet.</p>
        <p>Shin is a programmer and Ellen is a designer. But one day Ellen decided to learn how to code and become a web developer. And she was just lucky enough to find her best tutor.</p>
    </li>

    <li class="card text dating hidden">
        <h3>Officially boyfriend and girlfriend, <br/>2012</h3>
        <p>Long distance sounded like a curse but once again the internet came to rescue. (What else can we celebrate more in this era!)</p>
    </li>

    <li class="card text commute hidden">
        <h3>Commute for a date</h3>
        <p>6 trips.<br/>134597.45km total.<br/>That’s 3 ⅓ rounds around the Equator!</p>
        <p>And still one trip due <br/>early 2015...</p>
    </li>


  </ul>
</div>

<nav class="">

  <ul>
    <li class="home">
      <a ><i></i><span>Back to the tree</span></a>
    </li>
    <li class="history">
      <a ><i></i><span>Story of the two</span></a>
    </li>
    <li class="rsvp">
      <a ><i></i><span>RSVP</span></a>
    </li>
  </ul>
</nav>

<script src="js/script.js"></script>
<script>
  $('nav .history a').click(function(){
    // Show story-of-two slides
    $('#story-of-two').fadeIn(1000);
    $('body').addClass('show-story');
  });
</script>

</body>
</html>