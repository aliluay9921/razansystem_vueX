<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <div class="ui attached message">
        <div class="header">Welcome to our site!</div>
        <p>Fill out the form below to sign-up for a new account</p>
      </div>
      <div class="ui four column centered grid">
        <div class="row">
          <div class="column">
            <div class="ui labeled button" tabindex="0">
              <div class="ui red button"><i class="heart icon"></i> Like</div>
              <a class="ui basic red left pointing label"> 11 </a>
            </div>
          </div>
          <div class="column">
            <div class="ui labeled button" tabindex="0">
              <div class="ui red button"><i class="heart icon"></i> Like</div>
              <a class="ui basic red left pointing label"> 12 </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="ui labeled button" tabindex="0">
              <div class="ui red button"><i class="heart icon"></i> Like</div>
              <a class="ui basic red left pointing label"> 21 </a>
            </div>
          </div>
          <div class="column">
            <div class="ui labeled button" tabindex="0">
              <div class="ui red button"><i class="heart icon"></i> Like</div>
              <a class="ui basic red left pointing label"> 22 </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="ten wide column">
            <div class="ui steps">
              <div class="step">
                <i class="truck icon"></i>
                <div class="content">
                  <div class="title">Shipping</div>
                  <div class="description">Choose your shipping options</div>
                </div>
              </div>
              <div class="active step">
                <i class="payment icon"></i>
                <div class="content">
                  <div class="title">Billing</div>
                  <div class="description">Enter billing information</div>
                </div>
              </div>
              <div class="disabled step">
                <i class="info icon"></i>
                <div class="content">
                  <div class="title">Confirm Order</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="ui dropdown">
            <input type="hidden" name="gender" />
            <i class="dropdown icon"></i>
            <div class="default text">Gender</div>
            <div class="menu">
              <div class="item" data-value="male">Male</div>
              <div class="item" data-value="female">Female</div>
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
    console.log($(".dropdown"));
  },
};
</script>
