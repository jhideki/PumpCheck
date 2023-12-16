class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  setUserData(
    username,
    name,
    age,
    weight,
    feet,
    inches,
    bodyfat,
    bench,
    squat,
    deadlift
  ) {
    let height = feet * 30 + inches * 2.54;
    this.name = name;
    this.username = username;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.bodyfat = bodyfat;
    this.bench = bench;
    this.squat = squat;
    this.deadlift = deadlift;
  }
  getUserData() {
    return (userProfileData = {
      username: this.username,
      age: this.age,
      weight: this.weight,
      height: this.height,
      bodyfat: this.bodyfat,
      bench: this.bench,
      squat: this.squat,
      bench: this.bench,
    });
  }
}

export default User;
