import { useEffect, useState } from 'react'
import './App.css'
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Period from './Period'
import { calcService } from './utils'
import { calcMilitarySeniority_CADRE } from './ut2'
import Results from './Results'

function App() {
  const [periods, setPeriods] = useState([{
    id: 1,
    begDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    multiplier: '1'
  }])

  const [results, setResults] = useState(null)
  const [calcError, setCalcError] = useState(null)

  const handleChange = (periodId, field, value) => {
    setPeriods(periods.map(period =>
      period.id === periodId ? { ...period, [field]: value } : period
    ))

    console.log(periods) // todo remove
  }

  const handleAddPeriod = () => {
    const lastPeriod = periods[periods.length - 1]
    const today = new Date().toISOString().split('T')[0]
    let newBegDate = today

    if (lastPeriod && lastPeriod.endDate) {
      const lastEndDate = new Date(lastPeriod.endDate)
      lastEndDate.setDate(lastEndDate.getDate() + 1)
      newBegDate = lastEndDate.toISOString().split('T')[0]
    }

    setPeriods([...periods, { id: periods.length + 1, begDate: newBegDate, endDate: today, multiplier: '1' }])

    //setPeriods([...periods, { id: periods.length + 1, begDate: null, endDate: null, multiplier: '1' }])
  }

  const isAddPeriodDisabled = () => {
    const lastPeriod = periods[periods.length - 1]
    if (!lastPeriod || !lastPeriod.endDate) return false
    const today = new Date().toISOString().split('T')[0]
    return lastPeriod.endDate === today
  }

  const handleDeletePeriod = (periodId) => {
    setPeriods(periods.filter(period => period.id !== periodId))
  }

  const handleCalc = () => {
    try {
      const periodsCopy = periods.map(period => ({ ...period, k: Number(period.multiplier) }))
      const periodsCopy2 = periodsCopy.filter(period => period.begDate && period.endDate)
      const periodsCopy3 = periodsCopy2.filter(period => {
        const begYear = new Date(period.begDate).getFullYear()
        const endYear = new Date(period.endDate).getFullYear()
        return begYear >= 1900 && endYear >= 1900
      })
      const periodsCopy4 = periodsCopy3.filter(period => period.begDate <= period.endDate)

      console.log('periodsCopy4 -- ', periodsCopy4)
      //const result = calcService(periodsCopy4)
      const result = calcMilitarySeniority_CADRE(periodsCopy4)
      //console.log(periodsCopy3)
      console.log('result -- ', result)
      setResults(result)
      setCalcError(null)
    } catch (e) {
      setResults(null)
      setCalcError(e instanceof Error ? e.message : String(e))
    }
  }

  useEffect(() => {
    handleCalc()
  }, [periods])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Калькулятор вислуги</Typography>
        </Stack>

        <Stack spacing={4} direction="row" sx={{ py: 2, width: '100%' }}>
          <Stack spacing={2} direction="column"
            sx={{ flex: 6, minWidth: 0, p: 2, borderRadius: 2, border: '1px solid #ccc' }}>
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h5">Періоди</Typography>
              <Button
                variant="contained"
                onClick={handleAddPeriod}
                disabled={isAddPeriodDisabled()}
              >Додати період</Button>
            </Stack>

            <Stack spacing={2} direction="column">
              {periods.length > 0 ? periods.map((period) =>
                <Period
                  key={period.id}
                  periodId={period.id}
                  data={period}
                  handleChange={handleChange}
                  handleDeletePeriod={handleDeletePeriod}
                />) : <Typography variant="body1">Немає періодів</Typography>}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ flex: 4, minWidth: 0 }}>
            {calcError && <Alert severity="error">{calcError}</Alert>}
            <Results data={results} />
          </Stack>

        </Stack>
      </Container>
    </Box>
  )
}

export default App
