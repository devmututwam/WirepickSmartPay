let db = new Dexie('reference-database');

// Config
db.version(3).stores({
    bankBranches: 'id,branchCode,bankId,branchName,createdDate,modifiedDate,createdBy,modifiedBy,sortCode,town,status',
    functionalOffices: 'id,name,organizationUnitId,isCashOffice,createdDate,modifiedDate,createdBy,modifiedBy',
    stations: 'code,regionCode,status,startDate,endDate,name,stationType,createdBy,createdDate,modifiedBy,modifiedDate',
    config: 'id,store,lastDateUpdated,nextDateOfUpdate',
    packageLabels: 'name,value'
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + Number(days));
    return result;
}

function loadLocalConfiguration(name = ''){
    return db.config.get(name);
}

function loadLocalFunctionalOffices(){
    return db.functionalOffices.toArray();
}

function loadLocalStations(){
    return db.stations.toArray();
}

function loadLocalPackagelabels(){
    return db.packageLabels.toArray();
}