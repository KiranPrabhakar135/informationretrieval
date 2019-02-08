# Delete the data
Invoke-WebRequest 'http://localhost:8984/solr/VSM/update?stream.body=<delete><query>*:*</query></delete>&commit=true'
Invoke-WebRequest 'http://localhost:8984/solr/BM25/update?stream.body=<delete><query>*:*</query></delete>&commit=true'
Invoke-WebRequest 'http://localhost:8984/solr/DFR/update?stream.body=<delete><query>*:*</query></delete>&commit=true'

# Reload the core
Invoke-WebRequest 'http://localhost:8984/solr/admin/cores?action=RELOAD&core=VSM'
Invoke-WebRequest 'http://localhost:8984/solr/admin/cores?action=RELOAD&core=BM25'
Invoke-WebRequest 'http://localhost:8984/solr/admin/cores?action=RELOAD&core=DFR'

# Re-index the data
Set-Location -Path "C:\IR\solr-6.6.5"
java -Dc=VSM -Dport=8984 -Dauto=yes -Dtype=application/json -jar post.jar "C:\IR\Project-3\project3_data\train.json"
java -Dc=BM25 -Dport=8984 -Dauto=yes -Dtype=application/json -jar post.jar "C:\IR\Project-3\project3_data\train.json"
java -Dc=DFR -Dport=8984 -Dauto=yes -Dtype=application/json -jar post.jar "C:\IR\Project-3\project3_data\train.json"

$timestamp = Get-Date -Format o | foreach {$_ -replace ":", "_" -replace "\.","_" -replace "//","_"}
$timestamp = $timestamp.Substring(21)

Set-Location C:\IR\Project-3\PythonCode
python json_to_trec.py $timestamp

Start-Sleep -m 500
Set-Location -Path "C:\IR\Project-3\trec_eval.9.0"
Start-Process -FilePath ".\trec_eval.exe" -ArgumentList "-q -c -M 1000 'C:\IR\Project-3\project3_data\qrel.txt' 'C:\IR\Project-3\TrecEvaluation\VSM_output$timestamp.txt'" -RedirectStandardOutput "C:\IR\Project-3\TrecEvaluation_1\VSM_Trec_output$timestamp.txt" -RedirectStandardError "C:\IR\Project-3\TrecEvaluation\error.txt"
Start-Sleep -m 500
Start-Process -FilePath ".\trec_eval.exe" -ArgumentList "-q -c -M 1000 'C:\IR\Project-3\project3_data\qrel.txt' 'C:\IR\Project-3\TrecEvaluation\BM25_output$timestamp.txt'" -RedirectStandardOutput "C:\IR\Project-3\TrecEvaluation_1\BM25_Trec_output$timestamp.txt" -RedirectStandardError "C:\IR\Project-3\TrecEvaluation\error.txt"
Start-Sleep -m 500
Start-Process -FilePath ".\trec_eval.exe" -ArgumentList "-q -c -M 1000 'C:\IR\Project-3\project3_data\qrel.txt' 'C:\IR\Project-3\TrecEvaluation\DFR_output$timestamp.txt'" -RedirectStandardOutput "C:\IR\Project-3\TrecEvaluation_1\DFR_Trec_output$timestamp.txt" -RedirectStandardError "C:\IR\Project-3\TrecEvaluation\error.txt"
Start-Sleep -m 500