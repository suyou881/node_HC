let postgre = require("./postgre");

exports.addMember =  function (memberData) {
    for(let i in memberData){
        if(memberData[i] =="") memberData[i] = null;
    }
    return new Promise(function (resolve, reject) {
        postgre.Member.create({
            first_name:memberData.firstName,
            last_name:memberData.lastName,
            email:memberData.email,
            password:memberData.password,
            address_street:memberData.addressStreet,
            address_city:memberData.addressCity,
            address_state:memberData.addressState,
            address_postal:memberData.addressPostal,
            is_Member:memberData.isMember,
            phone:memberData.phone
            })
            .then(() => resolve(memberData.firstName + " " + memberData.lastName + " created."))
            .catch((err) => reject(err));
    });
}

exports.checkMemberExist = function(e){
    console.log("checkMemberExist :     " + e);
    return new Promise(function (resolve, reject){
        postgre.Member.findAll({
            where:{
                email: e
            }
        })
        .then(result=>{
            //console.log(result);
            let exist=true;
            if(result==0){
                exist =false;
            }
            //console.log(exist);
            resolve(exist);
        })
        .catch(err =>reject(err));
    })
}
