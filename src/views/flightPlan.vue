<template>
  <div class="content-wrapper">
    <div class="details">
      <h2>معلومات الحجز</h2>
      <p>قم بالبحث بأستخدام المعلومات ادناه لتسجيل الطلب</p>
    </div>
    <div class="booking">
      <div class="child ui labeled button" tabindex="0">
        <div class="ui basic button">بغداد</div>
        <a class="ui teal left pointing label">
          <i class="map marker alternate icon red"></i>
          الى
        </a>
      </div>

      <div class="ui labeled button" tabindex="0">
        <div class="ui basic button">البصرة</div>
        <a class="ui teal left pointing label"
          ><i class="map marker alternate icon red"></i>

          من
        </a>
      </div>
    </div>
    <div class="booking-one">
      <div class="child ui labeled button" tabindex="0">
        <div class="ui basic button">22/2/2020</div>
        <a class="ui teal left pointing label">
          <i class="calendar alternate icon red"></i>
          تأريخ الرجوع
        </a>
      </div>
      <div class="ui labeled button" tabindex="0">
        <div class="ui basic button">22/2/2020</div>
        <a class="ui teal left pointing label">
          <i class="calendar alternate icon red"></i>

          تأريخ الاقلاع
        </a>
      </div>
    </div>
    <div class="steps-book">
      <div class="ui steps">
        <a class="step">
          <img src="/image/man.svg" alt="" />
          <div class="content">
            <div class="title">البالغين</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
        <a class="active step">
          <img src="/image/boy.svg" alt="" />
          <div class="content">
            <div class="title">الاطفال</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
        <a class="step">
          <img src="/image/baby-boy.svg" alt="" />
          <div class="content">
            <div class="title">الرضع</div>
            <div class="description"><b>5</b></div>
          </div>
        </a>
      </div>
    </div>
    <div class="company">
      <h2>شركات الطيران</h2>
    </div>

    <div class="drop-flight">
      <select name="skills" multiple="" class="ui fluid dropdown">
        <option value="">Skills</option>
        <option value="angular">Angular</option>
        <option value="css">CSS</option>
      </select>
    </div>
    <div class="resualt">
      <div class="flightline">
        <p>الخطوط الجوية التركية</p>
        <button><i class="plus icon"></i>اضافة رحلة</button>
      </div>
      <div class="multiblog">
        <div class="blog">
          <div class="content">
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div class="content">
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div class="content">
            <div class="child ui labeled button" tabindex="0">
              <a class="w-100 ui teal left pointing label"> سعر التذكرة </a>
              <div class="w-100 ui basic button">50</div>
            </div>
            <div class="ui icon input">
              <input type="text" placeholder="ملاحضة" />
            </div>
          </div>
        </div>
        <div class="blog">
          <div class="content">
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div class="content">
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div class="drop">
              <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div class="content">
            <div class="child ui labeled button" tabindex="0">
              <a class="w-100 ui teal left pointing label"> سعر التذكرة </a>
              <div class="w-100 ui basic button">50</div>
            </div>
            <div class="ui icon input">
              <input type="text" placeholder="ملاحضة" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "flightPlan",
  components: {},
  mounted() {
<<<<<<< HEAD
    console.log($(".dropdown"));
=======
    $(".dropdown").dropdown({
      clearable: true,
    });
    $(".dropdown").dropdown({
      clearable: true,
      placeholder: "any",
    });
>>>>>>> 9952c1e7b31bd36feba7b3c65b2e89f124a8199a
  },
};
</script>
<style>
.ui.category {
  margin-left: 500px !important ;
}

.details {
  text-align: right;
  padding: 20px;
  background-color: #f7ffff;
  border: 1px solid #02b7b2;
}
.booking {
  text-align: center;
  padding: 10px;
  margin: 10px;
}
.booking .child {
  margin: 50px !important;
}

.booking-one {
  text-align: center;
  margin-top: -30px;
  margin-left: 30px;
}
.booking-one .child {
  margin-right: 50px !important;
}
.steps-book {
  text-align: center;
  margin: 30px;
  background-color: #f7ffff;
  width: 90%;
  padding: 15px;
  margin-left: 50px;
  border: 1px solid #02b7b2;
}

.step {
  padding: 15px !important;
}
.content {
  text-align: center;
  padding-left: 80px;
}
.content .title {
  color: black !important;
  margin-bottom: 15px;
}
.content .description {
  font-size: 16px !important;
}
img {
  margin-right: 80px;
  width: 50px;
}
.active {
  background-color: #02b7b2 !important;
}
.active:after {
  background: #02b7b2 !important;
}
.company {
  text-align: right;
  padding: 20px;
  margin-right: 50px;
}
.dropdwon-company {
  margin-bottom: 20px;
}
.drop-flight {
  margin-bottom: 20px;
  margin-left: 190px;
  text-align: center;
  width: 80% !important ;
}
.resualt {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: #f7ffff;
  border: 1px solid #02b7b2;
  width: 70%;
  margin-left: 250px;
  direction: rtl;
  margin-bottom: 150px;
}
.resualt .flightline {
  padding: 20px;
  text-align: center;
  background-color: #f7ffff;
}
.resualt .flightline p {
  font-size: 16px;
  padding: 10px;
  font-family: sans-serif;
  font-weight: 600px;
}
.resualt .flightline button {
  font-size: 16px;
  border-radius: 20px;
  padding: 10px;
  width: 150px;
  background-color: #02b7b2;
}
.resualt .flightline button i {
  margin-left: 5px;
}
.multiblog {
  display: flex;
  flex-direction: column;
}
.blog {
  display: flex;
}
.resualt .content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
}
.drop {
  margin: 5px;
}
</style>
