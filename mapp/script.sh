cd ~/DuckieTown/gym-duckietown/gym_duckietown/workspace
roscore
roslaunch rosbridge_server rosbridge_websocket.launch
source ./devel/setup.sh
rosrun arttaxi talker.py
cd ~/DuckieTown/gym-duckietown/gym_duckietown
python3 server.py

cd ~/mapp
meteor

cd ~/DuckieTown/gym-duckietown
python3 manual_control.py --env-name Duckietown-udem1-v0