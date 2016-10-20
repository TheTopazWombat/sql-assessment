-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;

( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');

insert into users (
  firstname,
  lastname,
  email
)
values (
  'John',
  'Smith',
  'John@smith.com'
);

insert into users (
  firstname,
  lastname,
  email
)
values (
  'Dave',
  'Davis',
  'Dave@Davis.com'
);

insert into users (
  firstname,
  lastname,
  email
)
values (
  'Jane',
  'Janis',
  'Jane@Janis.com'
)
