webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkillsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_related_jobs_related_jobs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SkillsPage = (function () {
    function SkillsPage(navCtrl, _loadingCtrl, _alertCtrl, navParams, _jobDataProvider) {
        this.navCtrl = navCtrl;
        this._loadingCtrl = _loadingCtrl;
        this._alertCtrl = _alertCtrl;
        this.navParams = navParams;
        this._jobDataProvider = _jobDataProvider;
        this.currentJob = null;
        this.dreamJob = null;
        this.location = null;
        this.skillsOwned = [];
        this.skillsNeeded = [];
        this.skillsSelected = [];
        this.skillsSelectedLength = 0;
        this.currentJob = navParams.get('currentJob');
        this.dreamJob = navParams.get('dreamJob');
        this.location = navParams.get('location');
    }
    SkillsPage.prototype.ngOnInit = function () {
        var _this = this;
        this._jobDataProvider.getUuid(this.currentJob.id)
            .subscribe(function (res) {
            var job_uuid = res.uuid;
            console.log(job_uuid);
            _this._jobDataProvider.getSkillset(job_uuid)
                .subscribe(function (res) {
                console.log(res);
                for (var _i = 0, _a = res.skills; _i < _a.length; _i++) {
                    var skill = _a[_i];
                    if (skill.importance > 3)
                        _this.skillsOwned.push(skill.skill_name);
                }
                console.log(_this.skillsOwned);
                _this._jobDataProvider.getUuid(_this.dreamJob.id)
                    .subscribe(function (res) {
                    var job_uuid = res.uuid;
                    _this._jobDataProvider.getSkillset(job_uuid)
                        .subscribe(function (res) {
                        console.log("----");
                        console.log(res);
                        for (var _i = 0, _a = res.skills; _i < _a.length; _i++) {
                            var skill = _a[_i];
                            if ((skill.importance > 3) && (_this.skillsOwned.indexOf(skill.skill_name) < 0))
                                _this.skillsNeeded.push({
                                    skill_name: skill.skill_name,
                                    description: skill.description,
                                    importance: skill.importance,
                                    selected: false,
                                    uuid: skill.skill_uuid
                                });
                        }
                        console.log(_this.skillsNeeded);
                        _this.skillsNeededLength = _this.skillsNeeded.length;
                        // this.presentIntruction();
                    });
                });
            });
        });
        var loading = this._loadingCtrl.create({
            spinner: 'dots'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    SkillsPage.prototype.presentJobDescriptionAlert = function (skill) {
        var jobDescriptionAlert = this._alertCtrl.create({
            title: skill.skill_name,
            message: skill.description,
            buttons: ['Dismiss']
        });
        jobDescriptionAlert.present();
    };
    SkillsPage.prototype.presentIntruction = function () {
        var instructionAlert = this._alertCtrl.create({
            title: "test",
            message: "In order to become " + this.dreamJob.occupation + "from " + this.currentJob.occupation +
                ", we have identified " + this.skillsNeededLength + " skills that you need to work on. \r\n" +
                "The skills are ranked based on the importance. Click on the skill to read more about the skill. \r\n" +
                "You can select up to 3 skills that you hope to gain.",
            buttons: ['Dismiss']
        });
        instructionAlert.present();
    };
    SkillsPage.prototype.presentMaxSkillAlert = function () {
        var maxSkillAlert = this._alertCtrl.create({
            title: "",
            message: "Sorry, you can only select up to 3 skills",
            buttons: ['Dismiss']
        });
        maxSkillAlert.present();
    };
    SkillsPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    SkillsPage.prototype.pushSkill = function (index, event) {
        event.stopPropagation();
        if (this.skillsSelectedLength < 3 || this.skillsNeeded[index].selected) {
            this.skillsNeeded[index].selected = !this.skillsNeeded[index].selected;
            if (this.skillsNeeded[index].selected)
                this.skillsSelectedLength++;
            else
                this.skillsSelectedLength--;
        }
        else {
            this.presentMaxSkillAlert();
        }
    };
    SkillsPage.prototype.pushPage = function () {
        console.log(this.skillsSelectedLength);
        this.skillsSelected = [];
        for (var _i = 0, _a = this.skillsNeeded; _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.selected)
                this.skillsSelected.push(skill);
        }
        console.log(this.skillsSelected);
        // this.navCtrl.push(GigResultPage, {
        // 	currentJob: this.currentJob,
        // 	dreamJob: this.dreamJob,
        // 	location: this.location,
        // 	skillsOwned: this.skillsOwned,
        // 	skillsSelected: this.skillsSelected
        // })
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_related_jobs_related_jobs__["a" /* RelatedJobsPage */], {
            currentJob: this.currentJob,
            dreamJob: this.dreamJob,
            location: this.location,
            skillsOwned: this.skillsOwned,
            skillsSelected: this.skillsSelected
        });
    };
    SkillsPage.prototype.delete = function (chip) {
        chip.remove();
    };
    SkillsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-skills',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/skills/skills.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n		    {{skillsNeededLength}} Skills You Need\n		</ion-title>\n	</ion-navbar>\n\n 	<ion-toolbar class="chip-bar">\n 		<div *ngFor="let skill of skillsNeeded; let index = index;">\n	 		<ion-chip  *ngIf="skill.selected">\n			  <ion-label>{{skill.skill_name}}</ion-label>\n			  <button ion-button clear color="light" (click)="pushSkill(index, $event)">\n			    <ion-icon name="close-circle"></ion-icon>\n			  </button>\n			</ion-chip>\n		</div>\n\n		<p *ngIf="skillsSelectedLength == 0">\n			We have identified {{skillsNeededLength}} skills that you need to become {{dreamJob.occupation}} from {{currentJob.occupation}}. Please select up to 3 skills that you hope to gain.\n		</p>\n 	</ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n	<ion-list>\n	  <ion-item *ngFor="let skill of skillsNeeded; let index = index;" (click)="presentJobDescriptionAlert(skill)">\n	    <ion-thumbnail item-start>\n	      <!-- <img src="" class="img"> -->\n	    </ion-thumbnail>\n	    <h2>{{skill.skill_name}}</h2>\n	    <p>Importance: {{skill.importance}}/5</p>\n	    <button ion-button clear item-end>\n	    	<ion-icon name="ios-add-circle-outline" color="light" *ngIf = "!skill.selected" (click)="pushSkill(index, $event)"></ion-icon>\n	    	<ion-icon name="ios-checkmark-circle" color="secondary" *ngIf = "skill.selected" (click)="pushSkill(index, $event)"></ion-icon>\n	    </button>\n	  </ion-item>\n	</ion-list>\n\n	<ion-fab left bottom class="fab-back">\n		<button ion-fab color="dark" class="button-forward" (click)="popView()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n	</ion-fab>\n\n<!-- 	<div class="floating-bar">\n		<h3>{{skillsSelectedLength}} Skills Selected to Gain</h3>\n\n		<button ion-button clear>\n	    	<ion-icon name="ios-arrow-dropright-outline" color="primary" (click)="pushPage()"></ion-icon>\n	    </button>\n	</div> -->\n\n	<ion-fab right bottom class="fab-forward">\n		<button ion-fab color="dark" class="button-forward" (click)="pushPage()">\n			<ion-icon name="arrow-forward"></ion-icon>\n		</button>\n	</ion-fab>\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n	<div class="footnote">\n		<a href="http://socialinnovations.us/" target="_blank">Social Innovations Group</a> | © 2018 | version 1.3 | build 2018.06.01 \n	</div>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/skills/skills.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__["a" /* JobDataProvider */]])
    ], SkillsPage);
    return SkillsPage;
}());

//# sourceMappingURL=skills.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JobSearchPage = (function () {
    function JobSearchPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.title = '';
        this.searchQuery = '';
        this.items = [];
        this.jobList = [];
        this.occupationList = [];
        this.initializeItems();
        this.jobList = navParams.get('jobList');
        this.title = navParams.get('title');
    }
    JobSearchPage.prototype.initializeItems = function () {
        this.items = this.occupationList;
    };
    JobSearchPage.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.jobList; _i < _a.length; _i++) {
            var job = _a[_i];
            this.occupationList.push(job.occupation);
        }
    };
    JobSearchPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    JobSearchPage.prototype.selectJob = function (occupation) {
        for (var _i = 0, _a = this.jobList; _i < _a.length; _i++) {
            var job = _a[_i];
            if (job.occupation.toLowerCase() == occupation.toLowerCase()) {
                console.log(job);
                this.viewCtrl.dismiss(job);
            }
        }
    };
    JobSearchPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    JobSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-job-search',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/job-search/job-search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n    <ion-buttons start>\n	    <button ion-button icon-only (click)="closeModal()">\n	        <ion-icon item-right name="close-outline"></ion-icon>\n	    </button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let item of items; let index = index" (click) = selectJob(item)>\n      {{ item }}\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/job-search/job-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], JobSearchPage);
    return JobSearchPage;
}());

//# sourceMappingURL=job-search.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_job_data_job_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__skills_skills__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__job_search_job_search__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__city_search_city_search__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, modalCtrl, _jobDataProvider) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this._jobDataProvider = _jobDataProvider;
        this.jobList = [];
        this.cityList = [];
        this.currentJob = {
            id: '',
            occupation: '',
            group: ''
        };
        this.dreamJob = {
            id: '',
            occupation: '',
            group: ''
        };
        this.location = '';
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this._jobDataProvider.getJobData()
            .subscribe(function (res) {
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var job = res_1[_i];
                var jobInstance = {
                    id: job.id,
                    occupation: job.occupation,
                    group: job.group
                };
                _this.jobList.push(jobInstance);
            }
        });
        this._jobDataProvider.getCityData()
            .subscribe(function (res) {
            for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                var city = res_2[_i];
                var cityInstance = city.city + ', ' + city.state;
                _this.cityList.push(cityInstance);
            }
        });
    };
    HomePage.prototype.pushPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__skills_skills__["a" /* SkillsPage */], {
            currentJob: this.currentJob,
            dreamJob: this.dreamJob,
            location: this.location
        });
    };
    HomePage.prototype.openJobSearchModal = function (index) {
        var _this = this;
        if (index == 1) {
            var searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__job_search_job_search__["a" /* JobSearchPage */], {
                jobList: this.jobList,
                title: "Select your most recent job"
            });
            searchModal.present();
            searchModal.onDidDismiss(function (selectedItem) {
                console.log(selectedItem);
                if (selectedItem != null)
                    if (index == 1)
                        _this.currentJob = selectedItem;
                    else if (index == 2)
                        _this.dreamJob = selectedItem;
            });
        }
        else {
            var searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__job_search_job_search__["a" /* JobSearchPage */], {
                jobList: this.jobList,
                title: "Select your dream job"
            });
            searchModal.present();
            searchModal.onDidDismiss(function (selectedItem) {
                console.log(selectedItem);
                if (selectedItem != null)
                    if (index == 1)
                        _this.currentJob = selectedItem;
                    else if (index == 2)
                        _this.dreamJob = selectedItem;
            });
        }
    };
    HomePage.prototype.openCitySearchModal = function () {
        var _this = this;
        var searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__city_search_city_search__["a" /* CitySearchPage */], {
            cityList: this.cityList,
            title: "Please select your city"
        });
        searchModal.present();
        searchModal.onDidDismiss(function (selectedItem) {
            console.log(selectedItem);
            _this.location = selectedItem;
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/home/home.html"*/'<ion-content padding>\n	<div class="fullpage-input">\n		<div class="input">\n			<h2>\n				What\'s your most recent job?\n			</h2>\n			<ion-item (click) = "openJobSearchModal(1)">\n				<h3>{{currentJob.occupation}}</h3>\n				<ion-icon name="search" item-end></ion-icon>			\n			</ion-item>\n		</div>\n		\n		<div class="input">\n			<h2>\n				What\'s your dream job?\n			</h2>\n			<ion-item (click) = "openJobSearchModal(2)">\n				<h3>{{dreamJob.occupation}}</h3>\n				<ion-icon name="search" item-end></ion-icon>			\n			</ion-item>\n		</div>\n\n		<div class="input">\n			<h2>\n				Which city do you live in?\n			</h2>\n<!-- 			<ion-item>\n				<ion-input [value]="location" [(ngModel)]="location"></ion-input>\n			</ion-item> -->\n			<ion-item (click) = "openCitySearchModal()">\n				<h3>{{location}}</h3>\n				<ion-icon name="search" item-end></ion-icon>			\n			</ion-item>\n		</div>\n	</div>\n\n	<ion-fab right bottom class="fab-forward">\n		<button ion-fab color="dark" class="button-forward" (click)="pushPage()">\n			<ion-icon name="arrow-forward"></ion-icon>\n		</button>\n	</ion-fab>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n	<div class="footnote">\n		<a href="http://socialinnovations.us/" target="_blank">Social Innovations Group</a> | © 2018 | version 1.3 | build 2018.06.01 \n	</div>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_job_data_job_data__["a" /* JobDataProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelatedJobsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_gig_result_gig_result__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RelatedJobsPage = (function () {
    function RelatedJobsPage(navCtrl, _loadingCtrl, _alertCtrl, navParams, _jobDataProvider) {
        this.navCtrl = navCtrl;
        this._loadingCtrl = _loadingCtrl;
        this._alertCtrl = _alertCtrl;
        this.navParams = navParams;
        this._jobDataProvider = _jobDataProvider;
        this.currentJob = null;
        this.dreamJob = null;
        this.location = null;
        this.skillsOwned = [];
        this.skillsSelected = [];
        this.relatedJobs = [];
        this.relatedJobsLength = 0;
        this.currentJob = navParams.get('currentJob');
        this.dreamJob = navParams.get('dreamJob');
        this.location = navParams.get('location');
        this.skillsOwned = navParams.get('skillsOwned');
        this.skillsSelected = navParams.get('skillsSelected');
    }
    RelatedJobsPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.skillsSelected);
        this._jobDataProvider.getRelatedJobs(this.skillsSelected)
            .subscribe(function (res) {
            _this.relatedJobs = res;
            console.log(_this.relatedJobs);
            loading.dismiss();
            _this.relatedJobsLength = _this.relatedJobs.length;
        });
        var loading = this._loadingCtrl.create({
            spinner: 'dots'
        });
        loading.present();
        // setTimeout(() =>{
        // 	loading.dismiss();
        // }, 5000);
    };
    RelatedJobsPage.prototype.presentExploreAlert = function (index) {
        var _this = this;
        var exploreAlert = this._alertCtrl.create({
            title: "Explore Gigs",
            message: "Explore gigs related to " + this.relatedJobs[index].job_title,
            buttons: [{
                    text: 'Confirm',
                    handler: function () {
                        _this.pushPage(_this.relatedJobs[index]);
                    }
                }]
        });
        exploreAlert.present();
    };
    RelatedJobsPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    RelatedJobsPage.prototype.pushPage = function (jobSelected) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_gig_result_gig_result__["a" /* GigResultPage */], {
            currentJob: this.currentJob,
            dreamJob: this.dreamJob,
            location: this.location,
            skillsOwned: this.skillsOwned,
            skillsSelected: this.skillsSelected,
            jobSelected: jobSelected
        });
    };
    RelatedJobsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-related-jobs',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/related-jobs/related-jobs.html"*/'\n<ion-header>\n	<ion-navbar>\n		<ion-title>Related Jobs</ion-title>\n	</ion-navbar>\n\n   	<ion-toolbar class="chip-bar">\n		<p>We have identified {{relatedJobsLength}} intermediate occupations from which you can gain your selected skills. Choose one occupation to explore gigs. </p>\n 	</ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n	<ion-list>\n	  <ion-item *ngFor="let job of relatedJobs; let index = index ;" (click)="presentExploreAlert(index)">\n	    <ion-thumbnail item-start>\n	      <h1>{{index + 1}}</h1>\n	    </ion-thumbnail>\n	    <h2>{{job.job_title}}</h2>\n	    <p>Difficulty Level: {{job.level}}/10</p>\n	  </ion-item>\n	</ion-list>\n\n	<ion-fab left bottom class="fab-back">\n		<button ion-fab color="dark" class="button-forward" (click)="popView()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n	</ion-fab>\n\n<!-- 	<ion-fab right bottom class="fab-forward">\n		<button ion-fab color="dark" class="button-forward">\n			<ion-icon name="arrow-forward"></ion-icon>\n		</button>\n	</ion-fab> -->\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n	<div class="footnote">\n		<a href="http://socialinnovations.us/" target="_blank">Social Innovations Group</a> | © 2018 | version 1.3 | build 2018.06.01 \n	</div>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/related-jobs/related-jobs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__["a" /* JobDataProvider */]])
    ], RelatedJobsPage);
    return RelatedJobsPage;
}());

//# sourceMappingURL=related-jobs.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GigResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_browser_tab__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GigResultPage = (function () {
    function GigResultPage(navCtrl, _loadingCtrl, navParams, _jobDataProvider, _browserTab) {
        this.navCtrl = navCtrl;
        this._loadingCtrl = _loadingCtrl;
        this.navParams = navParams;
        this._jobDataProvider = _jobDataProvider;
        this._browserTab = _browserTab;
        this.currentJob = null;
        this.dreamJob = null;
        this.location = "";
        this.skillsOwned = [];
        this.skillsSelected = [];
        this.jobSelected = null;
        this.gigList = [];
        this.gigListLength = null;
        this.volunteerGigList = [];
        this.volunteerGigListLength = null;
        this.segment = null;
        this.selectedTab = "";
        this.selectedTab = "job";
        this.currentJob = navParams.get('currentJob');
        this.dreamJob = navParams.get('dreamJob');
        this.location = navParams.get('location');
        this.skillsOwned = navParams.get('skillsOwned');
        this.jobSelected = navParams.get('jobSelected');
        for (var _i = 0, _a = navParams.get('skillsSelected'); _i < _a.length; _i++) {
            var skill = _a[_i];
            this.skillsSelected.push(skill.skill_name);
        }
        console.log(this.skillsSelected);
        console.log(this.jobSelected);
    }
    GigResultPage.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this._loadingCtrl.create({
            spinner: 'dots'
        });
        loading.present();
        this._jobDataProvider.getGigs(this.currentJob, this.dreamJob, this.location, this.skillsOwned, this.skillsSelected, this.jobSelected)
            .subscribe(function (res) {
            console.log(res);
            _this.gigList = res.jobs.gigs;
            _this.gigListLength = _this.gigList.length;
            _this.volunteerGigList = res.volunteers.gigs;
            _this.volunteerGigListLength = _this.volunteerGigList.length;
            _this.segment = 1;
            loading.dismiss();
        });
    };
    GigResultPage.prototype.changeSegment = function (index) {
        this.segment = index;
    };
    GigResultPage.prototype.openGig = function () {
        var _this = this;
        this._browserTab.isAvailable()
            .then(function (isAvailable) {
            if (isAvailable) {
                _this._browserTab.openUrl("https://google.com");
            }
            else {
            }
        });
    };
    GigResultPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    GigResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gig-result',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/gig-result/gig-result.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title *ngIf="gigListLength>0">\n	    {{gigListLength + volunteerGigListLength}} Gigs For You\n	</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n  	<div *ngIf="gigListLength>0">\n	    <ion-segment [(ngModel)]=selectedTab>\n	      <ion-segment-button value="job" (click)="changeSegment(1)">\n	        Job Opportunities\n	      </ion-segment-button>\n	      <ion-segment-button value="volunteer" (click)="changeSegment(2)">\n	        Volunteer\n	      </ion-segment-button>\n	    </ion-segment>\n	</div>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content padding >\n\n	<div *ngIf="segment < 2">\n		<ion-card *ngFor="let gig of gigList; let index = index;" >\n			<a href={{gig.url}} target="_blank">\n				<ion-card-content>\n				<ion-card-title>\n					<h2>{{gig.title}}</h2>\n				</ion-card-title>\n				<p>{{gig.description}}</p>\n				</ion-card-content>\n			</a>\n		</ion-card>\n	</div>\n\n\n	<div *ngIf="segment > 1">\n		<ion-card *ngFor="let gig of volunteerGigList; let index = index;" >\n			<a href={{gig.url}} target="_blank">\n				<ion-card-content>\n				<ion-card-title>\n					<h2>{{gig.title}}</h2>\n				</ion-card-title>\n				<p>{{gig.description}}</p>\n				</ion-card-content>\n			</a>\n		</ion-card>\n	</div>\n\n	<ion-fab left bottom class="fab-back">\n		<button ion-fab color="dark" class="button-forward" (click)="popView()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n	</ion-fab>\n\n	<div class="fullpage-error" *ngIf="(gigListLength == 0) && (gigListLength != null)">\n		<h2>\n			We\'re sorry!\n		</h2>\n		<div class="illustration"></div>\n		<p>\n			We can\'t find any matched gigs for you. Try to explore gigs for another intermediate occupation or select different skills to work on.\n		</p>\n	</div>\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar>\n	<div class="footnote">\n		<a href="http://socialinnovations.us/" target="_blank">Social Innovations Group</a> | © 2018 | version 1.3 | build 2018.06.01 \n	</div>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/gig-result/gig-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_job_data_job_data__["a" /* JobDataProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_browser_tab__["a" /* BrowserTab */]])
    ], GigResultPage);
    return GigResultPage;
}());

//# sourceMappingURL=gig-result.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CitySearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CitySearchPage = (function () {
    function CitySearchPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.title = '';
        this.searchQuery = '';
        this.items = [];
        this.cityList = [];
        this.cityList = navParams.get('cityList');
        this.title = navParams.get('title');
        this.initializeItems();
        console.log(this.cityList);
    }
    CitySearchPage.prototype.initializeItems = function () {
        this.items = this.cityList;
    };
    CitySearchPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    CitySearchPage.prototype.selectCity = function (city) {
        this.viewCtrl.dismiss(city);
    };
    CitySearchPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CitySearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-city-search',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/city-search/city-search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n    <ion-buttons start>\n	    <button ion-button icon-only (click)="closeModal()">\n	        <ion-icon item-right name="close-outline"></ion-icon>\n	    </button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let item of items; let index = index" (click) = selectCity(item)>\n      {{ item }}\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/city-search/city-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], CitySearchPage);
    return CitySearchPage;
}());

//# sourceMappingURL=city-search.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_browser_tab__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dream_job_dream_job__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_skills_skills__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_job_search_job_search__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_city_search_city_search__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_gig_result_gig_result__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_related_jobs_related_jobs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_job_data_job_data__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dream_job_dream_job__["a" /* DreamJobPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_skills_skills__["a" /* SkillsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_job_search_job_search__["a" /* JobSearchPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_city_search_city_search__["a" /* CitySearchPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_gig_result_gig_result__["a" /* GigResultPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_related_jobs_related_jobs__["a" /* RelatedJobsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
                    mode: 'ios'
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dream_job_dream_job__["a" /* DreamJobPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_skills_skills__["a" /* SkillsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_job_search_job_search__["a" /* JobSearchPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_city_search_city_search__["a" /* CitySearchPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_gig_result_gig_result__["a" /* GigResultPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_related_jobs_related_jobs__["a" /* RelatedJobsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_browser_tab__["a" /* BrowserTab */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_job_data_job_data__["a" /* JobDataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DreamJobPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_job_data_job_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_skills_skills__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_job_search_job_search__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DreamJobPage = (function () {
    function DreamJobPage(navCtrl, navParams, modalCtrl, _jobDataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this._jobDataProvider = _jobDataProvider;
        this.jobList = [];
        this.currentJob = null;
        this.dreamJob = {
            id: '',
            occupation: '',
            group: ''
        };
        this.currentJob = navParams.get('currentJob');
        console.log(this.currentJob);
    }
    DreamJobPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dreamJob = {
            id: '13-2011.01',
            occupation: 'Accountants',
            group: 'Business and Financial Operations'
        };
        this._jobDataProvider.getJobData()
            .subscribe(function (res) {
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var job = res_1[_i];
                var jobInstance = {
                    id: job.id,
                    occupation: job.occupation,
                    group: job.group
                };
                _this.jobList.push(jobInstance);
            }
        });
    };
    DreamJobPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    DreamJobPage.prototype.pushPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_skills_skills__["a" /* SkillsPage */], {
            currentJob: this.currentJob,
            dreamJob: this.dreamJob
        });
    };
    DreamJobPage.prototype.openSearchModal = function () {
        var _this = this;
        var searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_job_search_job_search__["a" /* JobSearchPage */], {
            jobList: this.jobList
        });
        searchModal.present();
        searchModal.onDidDismiss(function (selectedJob) {
            console.log(selectedJob);
            if (selectedJob != null)
                _this.dreamJob = selectedJob;
        });
    };
    DreamJobPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dream-job',template:/*ion-inline-start:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/dream-job/dream-job.html"*/'<ion-content padding>\n	<ion-card class = "fullpage-card">\n\n		<ion-card-content>\n			<h2>What is Your Dream Job?</h2>\n\n			<div class="illustration"></div>\n\n			<div class="textbox-job">\n				<h3>{{dreamJob.occupation}}</h3>\n				<ion-icon name="search" (click)="openSearchModal()"></ion-icon>\n			</div>\n		</ion-card-content>\n\n	</ion-card>\n\n	<ion-fab left bottom class="fab-back">\n		<button ion-fab color="dark" class="button-forward" (click)="popView()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n	</ion-fab>\n\n	<ion-fab right bottom class="fab-forward">\n		<button ion-fab color="dark" class="button-forward" (click)="pushPage()">\n			<ion-icon name="arrow-forward"></ion-icon>\n		</button>\n	</ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/alexlu/Project/DreamGigs_ionic/DreamGigs/src/pages/dream-job/dream-job.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_job_data_job_data__["a" /* JobDataProvider */]])
    ], DreamJobPage);
    return DreamJobPage;
}());

//# sourceMappingURL=dream-job.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobDataProvider = (function () {
    function JobDataProvider(http) {
        this.http = http;
        console.log('Hello JobDataProvider Provider');
        this._dataAtWork_url = "https://api.dataatwork.org/v1/";
        this._url = "http://dreamgig.me:8000/api/v1/";
    }
    JobDataProvider.prototype.getCityData = function () {
        return this.http.get("../../assets/data/cities.json")
            .map(function (res) { return res; });
    };
    JobDataProvider.prototype.getJobData = function () {
        return this.http.get("../../assets/data/occupations.json")
            .map(function (res) { return res; });
    };
    JobDataProvider.prototype.getUuid = function (code) {
        return this.http.get(this._dataAtWork_url + "jobs/" + code)
            .map(function (res) { return res; });
    };
    JobDataProvider.prototype.getSkillset = function (uuid) {
        return this.http.get(this._dataAtWork_url + "jobs/" + uuid + "/related_skills")
            .map(function (res) { return res; });
    };
    JobDataProvider.prototype.getRelatedJobs = function (selectedSkills) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var body = {
            selectedSkills: selectedSkills
        };
        console.log(body);
        return this.http.post(this._url + "getRelatedJobs", body, { headers: headers })
            .map(function (res) { return res; });
    };
    JobDataProvider.prototype.getGigs = function (currentJob, dreamJob, location, skillsOwned, selectedSkills, selectedJob) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var body = {
            currentJob: currentJob.id,
            dreamJob: dreamJob.id,
            location: location.toLowerCase(),
            currentSkills: skillsOwned,
            requiredSkills: selectedSkills,
            selectedJob: selectedJob.normalized_job_title
        };
        console.log(body);
        return this.http.post(this._url + 'getGigs', body, { headers: headers })
            .map(function (res) { return res; });
    };
    JobDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], JobDataProvider);
    return JobDataProvider;
}());

//# sourceMappingURL=job-data.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map