<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Timeline</title>

    <script type="text/javascript">
        var baseUrl = '<?php echo base_url(); ?>';
    </script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/lib/angular.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/app.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/controller/timeout.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/controller/game.js"></script>

    <!-- logo font -->
    <link href='http://fonts.googleapis.com/css?family=Fugaz+One' rel='stylesheet' type='text/css'>

    <!-- bootstrap cdn -->
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">

    <script type="text/javascript">
    <?php
        foreach($data as $name => $object) {
            echo "var $name = " . json_encode($object) . "; ";
        }
    ?>
    </script>

</head>
<body ng-app="timeout">
    <div class="container">
        <ng-view></ng-view>
    </div>
</body>
</html>