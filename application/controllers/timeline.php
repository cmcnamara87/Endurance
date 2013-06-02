<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Timeline extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see http://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        // Check if the user has already played on this machine
//        $this->load->library('session');
//        if($this->session->userdata('user_id')) {
//            // user has already played
//            $user = R::load('user', $this->session->userdata('user_id'));
//
//        } else {
//
//        }


        // Create a new user
        $user = R::dispense('user');
        $user->level = 0;
        $user->highScore = 0;
        R::store($user);
        // Store the user id in the session
//        $this->session->set_userdata('user_id', $user->id);


        // Get the leader board
        $all = R::find('user',
            ' high_score != 0 ORDER BY high_score DESC ', array(
                'user_id'   => $user->id
        ));

        $leaderboard = R::exportAll( $all );

        $this->load->view('timeout_view', array(
            'data'  => array(
                'user'          => $user->export(),
                'leaderboard'   => $leaderboard
            )
        ));
    }

    public function username_store() {
        if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
            $_POST = json_decode(file_get_contents("php://input"), true);
        }

        $user = R::load('user', $_POST['user_id']);
        $user->name = $_POST['name'];
        R::store($user);

        echo json_encode($user->export());
    }

    public function store_score() {
        if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
            $_POST = json_decode(file_get_contents("php://input"), true);
        }

        $user = R::load('user', $_POST['user_id']);
        if($_POST['high_score'] > $user->highScore) {
            $user->highScore = $_POST['high_score'];
        }
        R::store($user);

        echo json_encode($user->export());
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */