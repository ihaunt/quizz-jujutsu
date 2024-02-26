import { Component, OnInit } from '@angular/core';
import quizz_questions from 'src/assets/data/quizz_questions.json';

@Component({
	selector: 'app-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
	titlle: string = '';
	questions: any;
	questionSelected: any;

	answers: string[] = [];
	answersSelected: string = '';

	questionsIndex: number = 0;
	questionMaxIndex: number = 0;

	finished: boolean = false;

	constructor() {}

	playerChoose(value: string) {
		this.answers.push(value);
		this.nextStep();
	}

	ngOnInit(): void {
		if (quizz_questions) {
			this.finished = false;
			this.titlle = quizz_questions.title;

			this.questionsIndex = 0;
			this.questions = quizz_questions.questions;
			this.questionSelected = this.questions[this.questionsIndex];

			this.questionMaxIndex = this.questions.length;

			console.log(this.questionMaxIndex);
			console.log(this.questionsIndex);
		}
	}

	async nextStep() {
		this.questionsIndex += 1;

		if (this.questionMaxIndex > this.questionsIndex) {
			this.questionSelected = this.questions[this.questionsIndex];

		} else {

			const finalAnswer: string = await this.checkResult(this.answers);

			this.finished = true;
			this.answersSelected = quizz_questions.results[finalAnswer as keyof
			typeof quizz_questions.results];
		}
	}

	async checkResult(answers: string[]) {
		const result = answers.reduce((previous, current, item, arr) => {
			if (
				arr.filter((item) => item === previous).length >
				arr.filter((item) => item === current).length
			) {
				return previous;
			} else {
				return current;
			}
		});
		return result;
	}
}
