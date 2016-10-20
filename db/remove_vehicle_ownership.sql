update vehicles set ownerId = null where id = $1 and ownerid = $2;
