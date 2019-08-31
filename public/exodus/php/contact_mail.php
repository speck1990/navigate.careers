<?php
/*
* Contact us form mail
*/
?>

<?php

    if (isset($_POST['contact_me'])) {
        // TO EMAIL: --> SET YOUR OWN EMAIL HERE
        // $to = 'support@modeltheme.com';
        $to = 'xzibit0606@gmail.com';
        $subject = $_POST['user_subject'];
        $form_user_first_name = $_POST['user_first_name'];
        $form_user_last_name = $_POST['user_last_name'];
        $form_user_email = $_POST['user_email'];
        $form_user_number = $_POST['user_number'];
        $form_comment = $_POST['user_message'];

        $message = '';
        $message .= "First Name: " .  $form_user_first_name . "\r\n";
        $message .= "Last Name: " .  $form_user_last_name . "\r\n";
        $message .= "Email: " . $form_user_email . "\r\n";
        $message .= "Phone number: " . $form_user_number . "\r\n";
        $message .= "Subject: " . $subject . "\r\n";
        $message .= "Message: " . $form_comment;

        $headers = 'From: ' . $form_user_first_name . ' '. $form_user_last_name . '<'. $form_user_email . '>';
        if( mail( $to, $subject, $message, $headers ) ) {
            #echo "<p>Your email has been sent! Thank you</p>";
        }
    }

?>