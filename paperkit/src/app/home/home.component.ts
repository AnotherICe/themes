import { Component, OnInit } from '@angular/core';
import { BlogService, IBlogSettings, IPostList } from '../core/blog.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	public blogSettings: IBlogSettings;
	public postList: IPostList;
	public authors: object;
	public webRoot: string;
	public blogCover: string;
	public blogLogo: string;
	public apiRoot: string;
	errorMessage = '';

	model = {
		left: true,
		middle: false,
		right: false
	};
	focus;
	focus1;

	constructor(private blogService: BlogService) { }

	ngOnInit(): void {
		this.apiRoot = environment.apiEndpoint + '/';
		this.webRoot = environment.apiEndpoint;

		this.blogService.getSettings().subscribe(
			result => {
				this.blogSettings = result;
				this.blogCover = environment.apiEndpoint + '/' + this.blogSettings.cover;
				this.blogLogo = environment.apiEndpoint + '/' + this.blogSettings.logo;
			},
			error => this.errorMessage = <any>error
		);

		this.blogService.getPosts().subscribe(
			result => { this.postList = result; },
			error => this.errorMessage = <any>error
		);

		this.blogService.getAuthors().subscribe(
			result => {
				this.authors = result;
			},
			error => this.errorMessage = <any>error
		);
	}

	onSubmit(f: NgForm) {
		if (f.value && f.value.txtEmail && !f.invalid) {
			this.blogService.subscribe(f.value.txtEmail).subscribe(
				() => {
					alert(f.value.txtEmail + ' added to the list. Thank you!');
				},
				error => this.errorMessage = <any>error
			);
		}
	}

	toDate(date): string {
		var monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];
		var d = new Date(date);
		return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}
}