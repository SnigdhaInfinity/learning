var connectionProvider=require('./../configDB/mySqlConnectionProvider');

module.exports.authenticate=function(req,res){
 
    var email=req.body.email;
    var password=req.body.password;
    var connection =connectionProvider.getSqlConnection();
    connection.query('SELECT * FROM ssp_users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    userName:results[0].username,
                    userEmail:results[0].email,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
     connectionProvider.closeSqlConnection(connection);
}

module.exports.profileData=function(req,res){
 
    var email=req.body.email;
    var connection =connectionProvider.getSqlConnection();
    connection.query('SELECT * FROM ssp_users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
           
                res.json({
                    status:true,
                    userList:results,
                    message:'successfully get Data!'
                })         
        }
        else{
          res.json({
              status:false,    
            message:"Data does not exits"
          });
        }
      }
    });
     connectionProvider.closeSqlConnection(connection);
}