import config from '../../config/config';

const htmlTable = async (params: any) => {
  let image_url = config.mongo.image_url+params.profile_pics;
  // <img src="data:image/jpeg;base64,${imageBase64}" alt="Image" />
  let img = "data:"+"uploads/"+params.profile_pics;
  //let img_ = "cid:"+params.profile_pics;
  let html =
    `<!DOCTYPE html>
      <html>
        <head>
          <style>
           table {
               font-family: arial, sans-serif;
               border-collapse: collapse;
               width: 100%;
             }
            
             td, th {
               border: 1px solid #dddddd;
               text-align: left;
               padding: 8px;
             }
            
             tr:nth-child(even) {
               background-color: #dddddd;
             }
          </style>
          </head>
            <body>
              <h2>Registration details</h2>
                <table>
                  <tr>
                    <th>Profile pics</th>
                    <td><img src=`+params.profile_pics+` width="100px;" height="100px;"></td>
                  </tr>
                  <tr>
                    <th>First Name</th>
                    <td>`+ params.first_name + `</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>`+ params.last_name + `</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>`+ params.email + `</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>`+ params.address + `</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>`+ params.state + `</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>`+ params.city + `</td>
                  </tr>
                  <tr>
                    <th>Zipcode</th>
                    <td>`+ params.zipcode + `</td>
                  </tr>
                  </table>
              </body>
        </html>`;
  return html;

}

export { htmlTable };