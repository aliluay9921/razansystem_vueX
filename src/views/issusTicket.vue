<template>
  <div class="content-wrapper">
    <div class="head">
      <h2>الخطوط الجوية العراقية</h2>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          passenger detail
        </div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th scope="col">PASSENGER TYPE</th>
                <th scope="col">NAME</th>
                <th scope="col">SPL.REQUEST</th>
                <th scope="col">TICKET NO.(S)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>adult</td>
                <td>ali luay</td>
                <td>NA</td>
                <td>1234</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          TRAVEL INFORMAION
        </div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th scope="col">FLIGHT Depart</th>
                <th scope="col">Arrive</th>
                <th scope="col">CLASS</th>
                <th scope="col">FARE <br />BASIS</th>
                <th scope="col">BAGGAGE <br />ALLOWANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>baghdad baghdad-international</td>
                <td>Amman Queen Alia international</td>
                <td>Economy</td>
                <td>Yeen</td>
                <td>adult:30kg</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">FLIGHT Depart</th>
                <th scope="col">Arrive</th>
                <th scope="col">CLASS</th>
                <th scope="col">FARE <br />BASIS</th>
                <th scope="col">BAGGAGE <br />ALLOWANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>baghdad baghdad-international</td>
                <td>Amman Queen Alia international</td>
                <td>Economy</td>
                <td>Yeen</td>
                <td>adult:30kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
h2 {
  text-align: center;
  padding: 40px;
}
.container {
  background-color: #eee;
  padding: 15px;
}

.card-header {
  text-align: center;
  font-size: 22px;
  padding: 10px;
  color: #fff;
  background-color: rgb(38, 78, 40);
}
table {
  width: 100%;
}
thead {
  background-color: rgb(166, 250, 170);
}
th {
  padding: 10px;
  margin: 10px;
}
td {
  padding: 10px;
  margin: 10px;
  text-align: center;
}
</style>
