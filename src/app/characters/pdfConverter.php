
<?php
//   /*
//   * Collect all Details from Angular HTTP Request.
//   */

$request = json_decode(file_get_contents("php://input"), true);

$pdf = PDF_new();
PDF_open_pdi_document ( $pdf, warrior.pdf)

?>

<html>
<body>


Request holds: <?php echo "<pre>Request:<br />", print_r($request, true) ,"</pre><br />"; ?> <br>


</body>
</html>
