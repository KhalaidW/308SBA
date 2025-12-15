// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function isAssignmentDue(dueDateString) {
  const today = new Date();
  const dueDate = new Date(dueDateString);
  return dueDate <= today;
}

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  try {

    const results = [];
    const processedLearners = {}

    for (const submission of submissions) {
      const learnerId = submission.learner_id;

      // Skip if learner already processed
      if (processedLearners[learnerId]) continue;

      let totalScore = 0;
      let totalPossible = 0;
      const assignmentDetails = [];

      for (let i = 0; i < submissions.length; i++) {
        const current = submissions[i];

        if (current.learner_id !== learnerId) {
          continue;
        }
        const assignment = ag.assignments.find(
          a => a.id === current.assignment_id
        );

        if (!assignment) {
          break;
        }

        if (!isAssignmentDue(assignment.due_at)) {
          continue;
        } else {
          const score = current.submission.score;
          const possible = assignment.points_possible;

          totalScore += score;
          totalPossible += possible;

          assignmentDetails.push({
            assignmentId: assignment.id,
            name: assignment.name,
            score: score,
            pointsPossible: possible
          });
        }
      }
      const average =
        totalPossible > 0
          ? (totalScore / totalPossible) * 100
          : 0;

      results.push({
        Id: learnerId,
        avg: average + "%",
        assignments: assignmentDetails
      });

      processedLearners[learnerId] = true;
    }

    delete processedLearners.undefined;

    return results

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
  // return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);


//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
