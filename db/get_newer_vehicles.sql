select * from vehicles
join users on vehicles.ownerId = users.id
where year > 2000
order by year desc;
