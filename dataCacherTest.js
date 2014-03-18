(function(window)
{   
    var dataCacherTest = function()
    { 
        var me = {};
        
        me.db = ''; 
        
       
        me.selectData = function(pointCount)
        {   
            var self = this;
                    self.db.transaction(function(req)
                    { 
                        req.executeSql('SELECT * FROM Data  WHERE pointData <= ' + pointCount + '', [], function(req,res)
                        {  
                            
                        });   
                        
                    },
                    self.onError,
                    self.onReadyTransaction);          
        };           
       
        
        me.openDataBase = function(name)
        {
            if(this.db == '')
            {
                this.db = window.openDatabase(name, '1.0', '', 2 * 1024 * 1024);                               
            }
        };

        me.formDataBase = function()
        {            
                this.db.transaction(function (req)
                {
                    req.executeSql('CREATE TABLE IF NOT EXISTS Data (DateTime,\n\
                                                                     PointData)'); 
                    req.executeSql('CREATE INDEX IF NOT EXISTS DateTimeIndex on Data (DateTime)');
                }, 
                this.onError,
                this.onReadyTransaction);
            };

        me.insertData = function(data, pointCount)
        {   
            var self = this;
            data = {data: 0, dateTime: '2008-05-19T00:03:04.000000'};
                    self.db.transaction(function(req)
                    {          
                        for(var i = 0; i < pointCount; i++)
                        {
                            data.data++;
                            req.executeSql('INSERT INTO Data (DateTime, PointData) VALUES ("' + data.dateTime + '",' + data.data + ')', [], function(req,res)
                            {                                
                            });   
                        }
                    },
                    self.onError,
                    self.onReadyTransaction);          
        };           
   
        me.onReadyTransaction = function()
        {                
            console.log( 'Transaction completed.' );
	};
 
	me.onError = function(err)
        {
            console.log(err);
	};
        
        me.onErrorSql = function(err)
        {
            console.log(err);
        };
        
        me.onReadySql = function()
        {
            console.log( 'Executing SQL completed.' );
        };
        
      
        me.openDataBase('DB');    
        me.formDataBase(); 

        return me;
        
        
    
    
    
    }; 
    
    window.dataCacherTest = dataCacherTest;
    

})(window);

