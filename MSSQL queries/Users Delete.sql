DELETE FROM AspNetUsers
WHERE Id IN (
    SELECT TOP 3 Id
    FROM AspNetUsers
    ORDER BY Id
)
