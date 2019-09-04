<?php
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

        # FIX: Replace this email with recipient email
        $mail_to = "example@gmail.com";
        
        # Sender Data
        $subject = filter_var(trim($POST["subject"]), FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
        $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($POST["name"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($POST["message"]);
        
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($subject) OR empty($message)) {
            # Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }
        
        # Mail Content
        $content = "Name: $name\r\n";
        $content .= "Email: $email\r\n";
        $content .= "Message: $message\r\n";

        # email headers.
        $headers  = "From: $email" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "MIME-Version: 1.0" . PHP_EOL;
        $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
        $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

        # Send the email.
        $success = mail($mail_to, $subject, $content, $headers);
        if ($success) {
            # Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            # Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong, we couldn't send your message.";
        }

    } else {
        # Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
