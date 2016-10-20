select * from vehicles
join users on Users.id = Vehicles.ownerid
where firstname like $1 || '%';
