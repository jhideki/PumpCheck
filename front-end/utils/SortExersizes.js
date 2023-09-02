import exercisesData from "../data/exercises.json";

function GetExercisesByMuscle(muscle) {
  const filteredExercises = exercisesData.exercises.filter((exercise) =>
    exercise.primaryMuscles.includes(muscle)
  );
  const exerciseNames = filteredExercises.map((exercise) => exercise.name);
  return exerciseNames;
}

export { GetExercisesByMuscle };
