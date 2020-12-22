import { CommonService } from './services/common.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryAction } from 'ngx-gallery';
import { NgxSpinnerService } from "ngx-spinner";

declare  var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'maverick-corporation';
  contactUsForm: FormGroup;
  imageUrl: string = environment.baseUrl + '/images/'
  imageList: any = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  actions: NgxGalleryAction[];
  images: any = [];

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
              public commonService: CommonService) {}

  async ngOnInit(): Promise<void> {
    this.galleryOptions = [
      { "image": false,
        "width": "100%",
        "thumbnailsRemainingCount": true,
        "previewZoom": true
      },
      { "breakpoint": 500, "width": "100%", "thumbnailsColumns": 2 }
    ];

    this.createContactUsFrom();
    await this.getGalleryListing();
  }

  async getGalleryListing() {
    this.commonService.getGalleryListing().then((res: any) => {
      console.log('res :: ' , res);
      if ( res.hasOwnProperty('data') ) {
        console.log('res :: ', res);
        this.imageList = res['data'];
        for (let index = 0; index < this.imageList.length; index++) {
          let obj =  {
            small: this.imageUrl + this.imageList[index]['name'],
            medium: this.imageUrl + this.imageList[index]['name'],
            big: this.imageUrl + this.imageList[index]['name']
          };
          this.images.push(obj);
        }
        this.galleryImages = this.images;

      } else {
      }
    }).catch(error => {
      console.log('error ::' , error)
    });
  }

  createContactUsFrom() {
    this.contactUsForm = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

  blockNumberSpecialCharacter(e: any) {
    const k = e.charCode;
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8);
  }

  blockCharacters(e: any) {
    const k = e.charCode;
    return ((k >= 48 && k <= 57) || k === 43);
  }

  ngAfterViewInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    $(window).scroll(function() {
      let scroll = $(window).scrollTop();
      if (scroll > '20') {
        $('.navbar-light').addClass('nav-white');
      } else if (scroll < '20') {
        $('.navbar-light').removeClass('nav-white');
      }
    });
    $(document).ready(function() {
      let scroll = $(window).scrollTop();
      if (scroll > '20') {
        $('.navbar-light').addClass('nav-white');
      } else if (scroll < '20') {
        $('.navbar-light').removeClass('nav-white');
      }
    });

    /* ============= Page ScrollSpy =========*/
    $(document).ready(function() {
      'use strict';
      $(window).on('load', function() {
        $('body').scrollspy({
          target: '#nav-main',
          offset: 70
        });
      });
      $('.page-scroll').on('click', function(event) {
        let $anchor = $(this);
        if ($(window).width() > 768) {
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 65
          }, 1500, function() {
          });
          event.preventDefault();
        } else {

          if ($(window).width() < 768) {
            $('.navbar-toggler').on('click');
            $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top - 50
            }, 1500, function() {
            });

            event.preventDefault();
          }
        }

      });

    });

    /*============== slider ==================*/
    $(document).ready(function() {
      $('.slider').slick('slickGoTo', 0);
    });
    $('.team-slider-one').click(function() {
      if ($(this).attr('data-slick-index') < -1) {
        $(this).parents('.slider').slick('slickGoTo', $('.team-slider').slick('getSlick').slideCount - Math.abs($(this).attr('data-slick-index')));
      } else {
        $(this).parents('.slider').slick('slickGoTo', $(this).attr('data-slick-index'));
      }
    });
    $('.slider').on('afterChange', function(event, slick, currentSlide, direction) {
      $(this).parents('.team-container').find('.team-data').find('.active').removeClass('active');
      let i = (currentSlide ? currentSlide : 0) + 1;
      $($(this).parents('.team-container').find('.team-data li:nth-child(' + i + ')').addClass('active')).animate({
        opacity: 0
      }, 0, function() {
        $(this).animate({
          opacity: 1
        }, 2000, function() {
          // Animation complete.
        });
      });
    });

    $('.team-slider').slick({
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1.5,
      prevArrow: $('.slick-arrow-left'),
      nextArrow: $('.slick-arrow-right'),
      centerMode: false,
      centerPadding: '0px',

      responsive: [{
          breakpoint: 1500,
          settings: {
            slidesToShow: 1.5
          }
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 1
          }
        },

      ]
    });
  }

  submitContactUs() {
    console.log('FormValue :: ' , this.contactUsForm.value);
    const postObj = {
      first_name: this.contactUsForm.value.fname,
      last_name: this.contactUsForm.value.lname,
      email: this.contactUsForm.value.email,
      phone_number: this.contactUsForm.value.phoneNumber,
      message: this.contactUsForm.value.message
    };

    this.commonService.postContactUs(postObj).then((res: any) => {
      console.log('res :: ' , res);
      if ( res.hasOwnProperty('result') ) {
        this.contactUsForm.reset();
        console.log('res :: ', res);
      } else {
      }
    }).catch(error => {
      console.log('error ::' , error)
    });
  }

}
