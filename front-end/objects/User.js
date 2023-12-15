class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  setUserData(age, weight, height, bodyfat, bench, squat, deadlift) {
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
