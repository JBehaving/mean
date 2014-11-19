'use strict';

angular.module('mean.users').controller('AccountController', ['$scope', 'Global', 'Account',
  function($scope, Global, Account) {
    $scope.global = Global;
    $scope.package = {
      name: 'account'
    };
	
	$scope.create = function(isValid) {
		if (isValid) {
			var account = new Account({
				city: this.city,
				emergencyContactName: this.emergencyContactName,
				personalEmail: this.personalEmail,
				primaryEmergencyPhoneNumber: this.primaryEmergencyPhoneNumber,
				primaryPhoneNumber: this.primaryPhoneNumber,
				secondaryEmergencyPhoneNumber: this.secondaryEmergencyPhoneNumber,
				secondaryPhoneNumber: this.secondaryPhoneNumber ,
				state: this.state,
				streetAddress: this.streetAddress,
				userFirstName: this.userFirstName,
				userLastName: this.userLastName,
				zip: this.zip
			});
		  
			account.$save(function(response) {
				$location.path('account/' + response._id);
			});
		} 
		else {
			$scope.submitted = true;
		}
    };
	
	$scope.update = function(isValid) {
		if (isValid) {
			var account = $scope.account;
			if (!account.updated) {
				account.updated = [];
			}
			account.updated.push();

			account.$update(function() {
				$location.path('account/' + account._id);
			});
		} 
		else {
			$scope.submitted = true;
		}
    };
	
	$scope.find = function() {
		Account.query(function(accounts) {
			$scope.accounts = accounts;
		});
    };
  }
]);
