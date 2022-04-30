console.log("Running");

let n = 4; //the flooe of the elevator
let m = 5; //the floor of the elevator

let speed = [1, 2, 3, 10];
//speed[0] = The seconds required when the elevator rises of falls 1 floor
//speed[1] = The seconds required when the elevator open the door
//speed[2] = The seconds required when the elevator close the door
//speed[3] = The seconds required when John walks to n-1 or n+1 floor

//@desc calculate the shortest duration among walk, elevator and semi-elevator
const calculateAllDuration = (m, n, speed) => {
  let elevatorOpenCloseDuration = speed[1] * 2 + speed[2];

  //if lift is above the jhon floor
  if (m >= n) {
    diff = m - n;

    elevatorDuration =
      diff * speed[0] + speed[0] * n + elevatorOpenCloseDuration;

    semiElevatorDuration =
      speed[3] * diff + speed[0] * m + elevatorOpenCloseDuration;

    walkDuration = speed[3] * n;

    return {
      walkDuration: walkDuration,
      semiElevatorDuration: semiElevatorDuration,
      elevatorDuration: elevatorDuration,
    };
  }
  if (m < n) {
    diff = n - m;

    elevatorDuration =
      speed[0] * diff + speed[0] * n + elevatorOpenCloseDuration;

    semiElevatorDuration =
      speed[3] * diff + speed[0] * m + elevatorOpenCloseDuration;

    walkDuration = speed[3] * n;

    return {
      elevatorDuration: elevatorDuration,
      semiElevatorDuration: semiElevatorDuration,
      walkDuration: walkDuration,
    };
  }
};

//return the best decision
const optimalDuration = (m, n, speed) => {
  //if jhon is already in 0 floor
  if (n == 0) {
    return { duration: 0, msg: "Jhon is already in 0 floor" };
  }
  const { walkDuration, semiElevatorDuration, elevatorDuration } =
    calculateAllDuration(m, n, speed);

  if (
    walkDuration <= semiElevatorDuration &&
    walkDuration <= elevatorDuration
  ) {
    return {
      duration: walkDuration,
      msg: "Jhon should just walk all the way.",
    };
  } else if (
    semiElevatorDuration <= walkDuration &&
    semiElevatorDuration <= elevatorDuration
  ) {
    return {
      duration: semiElevatorDuration,
      msg: `Jhon should walk ${m > n ? "up" : "down"} ${
        m > n ? m - n : n - m
      } floor and take elevator from there.`,
    };
  } else if (
    elevatorDuration <= walkDuration &&
    elevatorDuration <= semiElevatorDuration
  ) {
    return {
      duration: semiElevatorDuration,
      msg: `Jhon should take elevator all the way`,
    };
  }
};

console.log(optimalDuration(m, n, speed));
