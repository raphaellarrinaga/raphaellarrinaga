<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name entered';}
if ((isset($_POST['address'])) && (strlen(trim($_POST['address'])) > 0)) {
	$address = stripslashes(strip_tags($_POST['address']));
} else {$address = 'No title entered';}
if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
} else {$message = 'No message entered';}
ob_start();
?>

<html>
<head>
<style type="text/css">
</style>
</head>
<body>
<table width="550" border="1" cellspacing="2" cellpadding="2">
  <tr bgcolor="#eeffee">
    <td>Name</td>
    <td><?=$name;?></td>
  </tr>
  <tr bgcolor="#eeeeff">
    <td>Mail</td>
    <td><?=$address;?></td>
  </tr>
  <tr bgcolor="#eeffee">
    <td>Message</td>
    <td><?=$message;?></td>
  </tr>
</table>
</body>
</html>
<?
$body = ob_get_contents();

$to = 'larrinaga.raphael@gmail.com';
$email = 'larrinaga.raphael@gmail.com';
$fromaddress = 'larrinaga.raphael@gmail.com';
$fromname = "Online Contact";

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = 'larrinaga.raphael@gmail.com';
$mail->FromName = "Portfolio";
$mail->AddAddress('larrinaga.raphael@gmail.com',"Raphael");

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  "$name - $address";
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
	$recipient = 'your_email@example.com';
	$subject = 'Contact form failed';
	$content = $body;
  mail($recipient, $subject, $content, "From: mail@yourdomain.com\r\nReply-To: $name\r\nX-Mailer: DT_formmail");
  exit;
}
?>