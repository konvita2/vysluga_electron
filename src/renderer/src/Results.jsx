import { Box, Paper, Stack, Typography } from '@mui/material'

function Results({ data }) {
  if (!data) return null

  const totalLOS = data.totalLengthOfService
  const totalSen = data.totalSeniority
  const periods = data.periods ?? []

  return (
    <Paper elevation={2} sx={{ p: 2, backgroundColor: '#faf334ff' }}>
      <Stack spacing={2}>
        <Typography variant="h5">Результати</Typography>

        <Box>          
          <Typography variant="subtitle1" sx={{ fontSize: '1.4rem' }}>
            Вислуга: <span style={{ fontWeight: 'bold' }}>{totalSen.y} р., {totalSen.m} міс., {totalSen.d} дн.</span>
          </Typography>

          <Typography variant="subtitle1">
            Календарний стаж: <span style={{ fontWeight: 'bold' }}>{totalLOS.y} р., {totalLOS.m} міс., {totalLOS.d} дн.</span>
          </Typography>
        </Box>

        {periods.length > 0 && (
          <Stack spacing={1}>
            <Typography variant="subtitle2">По періодах:</Typography>

            {periods.map((p, index) => (
              <Box key={index} sx={{ pl: 2 }}>
                <Typography variant="body2">
                  {p.description} (k={p.k}):&nbsp;<br />
                  вислуга: {p.seniority.y}р {p.seniority.m}м {p.seniority.d}д<br />
                  календарний: {p.lengthOfService.y}р {p.lengthOfService.m}м {p.lengthOfService.d}д,&nbsp;
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

export default Results
