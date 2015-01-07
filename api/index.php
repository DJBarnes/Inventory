<?php

require 'Slim/Slim.php';

$app = new Slim();

$app -> get('/items/', 'getItems');
$app -> get('/items/:id', 'getItemInfo');
$app -> post('/items/', 'addItem');
$app -> put('/items/:id', 'updateItem');
$app -> delete('/items/:id', 'deleteItem');

$app -> get('/category/', 'getCategories');
$app -> get('/vendor/', 'getVendors');

$app -> post('/login/validate/:id', 'GetUser');
$app -> get('/logout/', 'LogoutUser');

$app -> get('/log/', 'getLogs');
$app -> post('/log/', 'logTransaction');

$app -> get('/users/', 'getUsers');
$app -> post('/users/', 'addUser');
$app -> put('/users/:id', 'updateUserPassword');
$app -> delete('/users/:id', 'deleteUser');

$app -> post('/orders/', 'submitOrder');
$app -> get('/orders/', 'getOrder');
$app -> put('/orders/:id', 'closeOrder');

$app -> run();

function getItems() {
  $sql = "SELECT * FROM ItemType";
  try {
    $db = getConnection();
    $stmt = $db -> query($sql);
    $Items = $stmt -> fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($Items);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getItemInfo($id) {
  $sql = "SELECT ItemType.id as id, ItemType.name as name, quantity, description, itemUrl, Category.id as categoryId, 
           Category.name as categoryName, Vendor.id as vendorId, Vendor.name as vendorName, Vendor.url as vendorUrl, emailThreshold 
           FROM ItemType JOIN Category ON ItemType.categoryId = Category.id JOIN Vendor ON ItemType.vendorId = Vendor.id WHERE ItemType.id = :id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $Item = $stmt -> fetchObject();
    $db = null;
    echo json_encode($Item);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function addItem() {
  error_log('addItem\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance() -> request();
  $Item = json_decode($request -> getBody());
  $sql = "INSERT INTO ItemType (name, quantity, description, categoryId, vendorId, emailThreshold, itemUrl) VALUES (:name, :quantity, :description, :categoryId, :vendorId, :emailThreshold, :itemUrl)";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("name", $Item -> name);
    $stmt -> bindParam("quantity", $Item -> quantity);
    $stmt -> bindParam("description", $Item -> description);
    $stmt -> bindParam("categoryId", $Item -> categoryId);
    $stmt -> bindParam("vendorId", $Item -> vendorId);
    $stmt -> bindParam("emailThreshold", $Item -> emailThreshold);
    $stmt -> bindParam("itemUrl", $Item -> itemUrl);
    $stmt -> execute();
    $Item -> id = $db -> lastInsertId();
    $db = null;
    getItemInfo($Item -> id);
  } catch(PDOException $e) {
    error_log($e -> getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function updateItem($id) {
  $request = Slim::getInstance() -> request();
  $body = $request -> getBody();
  $Item = json_decode($body);
  $sql = "UPDATE ItemType SET name=:name, quantity=:quantity, description=:description, categoryId=:categoryId, vendorId=:vendorId, emailThreshold=:emailThreshold, itemUrl=:itemUrl WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("name", $Item -> name);
    $stmt -> bindParam("quantity", $Item -> quantity);
    $stmt -> bindParam("description", $Item -> description);
    $stmt -> bindParam("categoryId", $Item -> categoryId);
    $stmt -> bindParam("vendorId", $Item -> vendorId);
    $stmt -> bindParam("emailThreshold", $Item -> emailThreshold);
    $stmt -> bindParam("itemUrl", $Item -> itemUrl);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $db = null;
    echo json_encode($Item);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function deleteItem($id) {
  $sql = "DELETE FROM ItemType WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getCategories() {
  $sql = "SELECT name as categoryName, id, consumable FROM Category";
  try {
    $db = getConnection();
    $stmt = $db -> query($sql);
    $Categories = $stmt -> fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($Categories);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getVendors() {
  $sql = "SELECT name as vendorName, id, url FROM Vendor";
  try {
    $db = getConnection();
    $stmt = $db -> query($sql);
    $Vendors = $stmt -> fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($Vendors);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function GetUser($id) {
  //the id that is being passed in is not needed. just need it since it is a fetch on the frontend, and a post instead of a get.
  if ($id != 0) {
    getUserInfo($id);
  } else {
    LoginValidate();
  }
}

function LogoutUser() {
  echo 'hit the logout shit';
  //remove PHPSESSID from browser
  if (isset($_COOKIE[session_name()]))
    setcookie(session_name(), "", time() - 3600, "/");
  //clear session from globals
  $_SESSION = array();
}

function logTransaction() {
  error_log('logTransaction\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance() -> request();
  $Log = json_decode($request -> getBody());
  $sql = "INSERT INTO TransactionLog (userName, itemName, action, logDate) VALUES (:userName, :itemName, :action, :logDate)";
  try {
    $logDate = date('Y-m-d H:i:s');
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("userName", $Log -> userName);
    $stmt -> bindParam("itemName", $Log -> itemName);
    $stmt -> bindParam("action", $Log -> action);
    $stmt -> bindParam("logDate", $logDate);
    $stmt -> execute();
    $Log -> id = $db -> lastInsertId();
    $db = null;
    $Log -> logDate = $logDate;
    echo json_encode($Log);
  } catch(PDOException $e) {
    error_log($e -> getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getLogs() {
  try {
    $sql = "SELECT * FROM TransactionLog";
    // ORDER BY logDate DESC LIMIT 100";

    $db = getConnection();
    $stmt = $db -> query($sql);
    $Logs = $stmt -> fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($Logs);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getUsers() {
  $sql = "SELECT * FROM Users";
  try {
    $db = getConnection();
    $stmt = $db -> query($sql);
    $Users = $stmt -> fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($Users);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function addUser() {
  error_log('addItem\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance() -> request();
  $User = json_decode($request -> getBody());
  $sql = "INSERT INTO Users (username, password, email) VALUES (:username, :password, :email)";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("username", $User -> username);
    $stmt -> bindParam("password", $User -> password);
    $stmt -> bindParam("email", $User -> email);
    $stmt -> execute();
    $User -> id = $db -> lastInsertId();
    $db = null;
    getUserInfo($User -> id);
  } catch(PDOException $e) {
    error_log($e -> getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function updateUserPassword($id) {
  $request = Slim::getInstance() -> request();
  $body = $request -> getBody();
  $User = json_decode($body);
  $sql = "UPDATE Users SET password=:password WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("password", $User -> password);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $db = null;
    echo json_encode($User);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function deleteUser($id) {
  $sql = "DELETE FROM Users WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getUserInfo($sessId) {
  $sql = "SELECT * FROM Users WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("id", $sessId);
    $stmt -> execute();
    $User = $stmt -> fetchObject();
    $db = null;
    echo json_encode($User);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function LoginValidate() {
  $username = $_POST['Username'];
  $password = $_POST['Password'];
  $sql = "SELECT * FROM Users WHERE username=:username";
  try {
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("username", $username);
    $stmt -> execute();
    $User = $stmt -> fetchObject();
    $db = null;
    if ($User) {
      if ($User -> username == $username && $User -> password == $password) {
        session_id($User -> id);
        session_start();

        echo json_encode($User);
      } else {
        echo 'Sorry your password or username is invalid. Please try again.';
      }
    } else {
      echo "Sorry your password or username is invalid. Please try again.";
    }
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getOrder() {
  $sql = "SELECT DISTINCT Orders.id,orderDate,status,vendorId FROM Orders, Order_Item, ItemType WHERE Orders.id = Order_Item.orderId AND Order_Item.itemId = ItemType.id";
  try {
    $db = getConnection();
    $stmt = $db -> query($sql);
    $Orders = $stmt -> fetchAll(PDO::FETCH_OBJ);

    foreach ($Orders as $order) {
      $sql = "SELECT * from Order_Item WHERE orderId = " . $order -> id;
      $stmt = $db -> query($sql);
      //$stmt -> bindParam("orderId", $order -> id);
      $Items = $stmt -> fetchAll(PDO::FETCH_OBJ);
      $order -> items = $Items;
    }
    $db = null;
    echo json_encode($Orders);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function submitOrder() {
  error_log("submitOrder\n", 3, '/var/tmp/php.log');
  $request = Slim::getInstance() -> request();
  $body = $request -> getBody();
  $order = json_decode($body);

  $sql = "INSERT INTO Orders (orderDate, status) VALUES (:orderDate, :status)";
  try {
    $logDate = date('Y-m-d H:i:s');
    $order -> status = true;
    $order -> orderDate = $logDate;
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("orderDate", $order -> orderDate);
    $stmt -> bindParam("status", $order -> status);
    $stmt -> execute();
    $order -> id = $db -> lastInsertId();
    error_log("Inserted Order\n", 3, '/var/tmp/php.log');
    //The order is now created. Need to add the items to it next
    try {
      $sql = "INSERT INTO Order_Item (orderId, itemId, orderQty) VALUES (:orderId, :itemId, :orderQty)";
      foreach ($order -> items as $item) {
        $stmt = $db -> prepare($sql);
        $stmt -> bindParam("itemId", $item -> itemId);
        $stmt -> bindParam("orderId", $order -> id);
        $stmt -> bindParam("orderQty", $item -> orderQty);
        $stmt -> execute();
        $item -> id = $db -> lastInsertId();
      }
      addOrderToEmail($order);

    } catch(PDOException $e) {
      error_log($e -> getMessage(), 3, '/var/tmp/php.log');
      echo '{"error":{"text":' . $e -> getMessage() . '}}';
    }

    $db = null;
  } catch(PDOException $e) {
    error_log($e -> getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }

  echo json_encode($order);
}

function addOrderToEmail($order) {
  try {
    $emailOrder = "Here is a list of items, quantities and associated URL's that need to be ordered.\n\n";
    $sql = "Select name From Vendor where id = :vendorId";

    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("vendorId", $order -> vendorId);
    $stmt -> execute();
    $vendorName = $stmt -> fetchObject();

    $emailOrder = $emailOrder . "Order Number: " . $order -> id . "\n";
    $emailOrder = $emailOrder . "Vendor Name: " . $vendorName -> name . "\n";
    $emailOrder = $emailOrder . "Items:\n";
    $emailOrder = $emailOrder . "\t" . str_pad("Item Name",20);
    $emailOrder = $emailOrder . str_pad("Quantity",10);
    $emailOrder = $emailOrder . "URL\n";

    foreach ($order -> items as $item) {
      $sql = "Select name, itemUrl from ItemType where id = :id";
      $stmt = $db -> prepare($sql);
      $stmt -> bindParam("id", $item -> itemId);
      $stmt -> execute();
      $itemInfo = $stmt -> fetchObject();

      $emailOrder = $emailOrder . "\t" . str_pad($itemInfo -> name,20);
      $emailOrder = $emailOrder . str_pad($item -> orderQty,10);
      $emailOrder = $emailOrder . $itemInfo -> itemUrl . "\n";
    }
    $emailOrder = $emailOrder . "\n\n";
    error_log($emailOrder, 3, '/var/tmp/php.log');

    //Need to add a TO and FROM email addres to make this work
    //In addition, the hosting server needs to be setup to send email
    $to = "";
    $subject = "CAE Order Created";
    $message = $emailOrder;
    $from = "";

    mail($to, $subject, $message, "From: " . $from);
  } catch (exception $e) {
    error_log($e -> getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function closeOrder($id) {
  $request = Slim::getInstance() -> request();
  $body = $request -> getBody();
  $Order = json_decode($body);
  $sql = "UPDATE Orders SET status=:status WHERE id=:id";
  try {
    $Order -> status = 0;
    $db = getConnection();
    $stmt = $db -> prepare($sql);
    $stmt -> bindParam("status", $Order -> status);
    $stmt -> bindParam("id", $id);
    $stmt -> execute();
    $db = null;
    echo json_encode($Order);
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e -> getMessage() . '}}';
  }
}

function getConnection() {
  $dbhost = "localhost";
  $dbuser = "root";
  $dbpass = "root";
  $dbname = "InvControl";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  $dbh -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}
?>
