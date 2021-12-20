<?php
	class Mail {
		private $validators = array("name" => 20, "email" => 65, "title" => 35, "message" => 800);
		
		function __construct() {
			$this->sendMail();
		}
		
		function sendMail() {
			$json = file_get_contents("php://input");
			$dataArray = json_decode($json, true);

			if ($this->validation($dataArray)) {
				$title = stripslashes($dataArray["title"]["value"]);
				$email = stripslashes($dataArray["email"]["value"]);
				$name = stripslashes($dataArray["name"]["value"]);
				$message = stripslashes($dataArray["message"]["value"]);
				$mailMessage = "Email: " . $email . "<br /><br /> Name: " . $name . "<br /><br /> Message: " . $message;
				
				try {
					$to = "example@example.com";
					$from = "Example <example@example.com>";
					$encoding = "utf-8";
					
					// Preferences for Subject field
					$subjectPreferences = array(
						"input-charset" => $encoding,
						"output-charset" => $encoding,
						"line-break-chars" => "\r\n"
					);

					// Mail header
					$header = "Content-type: text/html; charset=".$encoding." \r\n";
					$header .= "From: ".$from." \r\n";
					$header .= "MIME-Version: 1.0 \r\n";
					$header .= "Content-Transfer-Encoding: 8bit \r\n";
					$header .= "Date: ".date("r (T)")." \r\n";
					$header .= iconv_mime_encode("Subject", $title, $subjectPreferences);

					// Send mail
					mail($to, $title, $mailMessage, $header);
					echo json_encode(array("status" => 200, "message" => "success"));
				} catch (Exception $e) {
					echo json_encode(array("status" => 500, "message" => $e->getMessage()));
				}
			} else {
				echo json_encode(array("status" => 411, "fieldValues" => $dataArray));
			}
		}

		// TODO: You can improve this function to return which validator has failed
		function validation($dataArray) {
			$validatorFail = false;
			foreach ($this->validators as $key => $validatorLength) {
				$text = $dataArray[$key]["value"];
				$text = isset($text) ? $text : null;
				if ($text != null && strlen($text) <= $validatorLength) {
					$validatorFail = true;
					break;
				}	
			}
			
			return $validatorFail;
		}		
	}	
	
	new Mail();
?>
