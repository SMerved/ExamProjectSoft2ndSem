@echo Testing Current Minimum

@del .\jmeter.log
@rmdir /s /q .\cMinLogs
@rmdir /s /q .\cMinReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\CurrentMinTestPlan.jmx -l .\cMinLogs\cMin.jtl -e -o .\cMinReport\

@echo Testing Current Maximum

@del .\jmeter.log
@rmdir /s /q .\cMaxLogs
@rmdir /s /q .\cMaxReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\CurrentMaxTestPlan.jmx -l .\cMaxLogs\cMax.jtl -e -o .\cMaxReport\

@echo Testing Five Year Minimum

@del .\jmeter.log
@rmdir /s /q .\fMinLogs
@rmdir /s /q .\fMinReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\FiveMinTestPlan.jmx -l .\fMinLogs\fMin.jtl -e -o .\fMinReport\

@echo Testing Five Year Maximum

@del .\jmeter.log
@rmdir /s /q .\fMaxLogs
@rmdir /s /q .\fMaxReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\FiveMaxTestPlan.jmx -l .\fMaxLogs\fMax.jtl -e -o .\fMaxReport\