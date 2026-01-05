### controlled와 uncontrolled 컴포넌트

#### controlled 컴포넌트

입력 값에 대한 상태 제어권이 React에 있는 경우

```js
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <input
      value={phoneNumber}
      onChange={(event) => setPhoneNumber(event.target.value)}
    />
  )
}
```

동작흐름

```
사용자 입력
 → 브라우저가 DOM value 변경
 → React onChange
 → setState
 → render
 → React가 value={state}로 DOM을 다시 맞춤
```

위 코드는 인풋에 입력되는 값이 setPhoneNumber 훅에 의해서 phoneNumber의 값이 변경되고,
변경된 값이 DOM에 반영되어 출력되는 구조로 controlled 컴포넌트이다.

#### uncontrolled 컴포넌트

입력 값에 대한 제어권이 React에 없는 경우

```js
const App = () => {
  return <input />
}

//값을 읽고 싶을 때는 ref를 사용
```

동작흐름

```
사용자 입력
→ 브라우저가 DOM value 변경
→ React 관여 없음
```

위 코드는 인풋에 값을 입력하는 경우 입력값 변경은 DOM이 관리한다.
입력 값의 출처가 React state가 아닌 DOM에 있어 uncontrolled 컴포넌트이다.

### 문제

```js
// parent.tsx
const Parent = () => {
  const [phoneNumber,setPhoneNumber] = useState('');
...
return (
    <PhoneNumber
        phoneNumber={phoneNumber}
        error={error}
        reset={reset}
        setPhoneNumber={setPhoneNumber}
        sendVerificationCode={sendVerificationCode}
        isLoading={isPhoneNumberSent}
     />
  )
}
```

```js
// PhoneNumber.tsx
const PhoneNumber = () => {
  return (
    ...
    <Input
      value={phoneNumber}
      maxLength={13}
      onChange={(e) => {
        if (error) reset()
        if (errorMsg === '' && isValidPhoneFormat(e.target.value) === false)
          setErrorMsg('올바른 번호를 입력해주세요.')
        if (isValidPhoneFormat(e.target.value) && errorMsg !== '')
          setErrorMsg('')
        e.target.value = e.target.value.replace(/[^0-9-]/g, '')
        setPhoneNumber(e.target.value)
      }}
      label='휴대폰 번호:'
      placeholder='휴대폰 번호를 입력해주세요.'
    />
    ...
  )
}
```

#### 1. DOM의 값을 직접 수정하는 로직

작성한 코드 controlled input이지만, onChange에서 e.target.value = ...로
DOM 값을 직접 수정하는 로직(DOM 값을 먼저 조작하는 side effect)이 포함되어 있다.

현재동작

```
사용자 입력
→ 브라우저가 DOM value 변경
→ React onChange 이벤트
→ e.target.value = ... ← DOM 직접 변경 (1차 DOM 반영)
→ setState 호출
→ React render
→ React가 value={state}로 DOM value 재설정 (2차 DOM 반영)
```

DOM을 직접 수정하는 경우,
브라우저와 React가 DOM value를 번갈아 갱신하는 흐름이 되어 불필요한 DOM 조작이 추가될 수 있다.
<br/>
<br/>

#### 2. 자식이 입력 이벤트를 해석하고 부모 상태를 직접 변경하는 방식

이 방식은 상태 소유권(Parent)과 입력 처리 로직(PhoneNumber)이 분리되지 않아 다음 문제가 생긴다.

- Parent는 phoneNumber를 소유하는 controlled 구조이지만, setPhoneNumber를 그대로 내려주고 있어 상태가 어떤 규칙으로 업데이트되는지 Parent 코드만 보고 파악하기 어렵다.
- PhoneNumber는 단순 UI 컴포넌트처럼 보이지만, 실제로는 입력값 정제/검증/에러 처리/부모 상태 업데이트까지 처리하고 있어, 제어 흐름이 “자식이 부모 상태를 관리하는 것처럼” 보인다.

결과적으로 제어권(어디에서 어떤 기준으로 상태가 바뀌는지)이 불명확해지고, 유지보수/테스트/재사용성이 떨어진다.

개선

```js
// parent.tsx
const Parent = () => {
  const [phoneNumber,setPhoneNumber] = useState('');

  const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        if (verificationCodeErrorMsg || isShownError || isSent) {
          resetVerificationCodeStatus()
          resetVerifyCodeStatus()
        }
        const sanitize = event.target.value.replace(/[^0-9-]/g, '')
        checkValidFormat(sanitize, isShownError, setIsShownError)
        setPhoneNumber(sanitize)
      }
...

return (
  <PhoneNumber
      phoneNumber={phoneNumber}
      isSent={isSent}
      error={phoneNumberErrorMsg}
      onChangePhoneNumber={handleChangePhoneNumber}
      onSendVerificationCode={() => sendVerificationCode(phoneNumber)}
      isLoading={isPhoneNumberSent}
    />
  )
}
```

```js
// PhoneNumber.tsx
const PhoneNumber = () => {
  return (
    ...
    <Input
      value={phoneNumber}
      maxLength={13}
      onChange={onChangePhoneNumber}
      label='휴대폰 번호:'
      placeholder='휴대폰 번호를 입력해주세요.'
    />
    ...
  )
}
```

#### 1. DOM 직접 조작 제거

DOM을 직접 수정하지 않고, 입력값을 정제한 값을 계산해서 state에만 반영하도록 수정

```js
const sanitize = event.target.value.replace(/[^0-9-]/g, '')
setPhoneNumber(sanitize)
```

#### 2. 상태 제어권 명확화

입력값 정제/검증/에러 처리/부모 상태 업데이트까지 입력 처리 규칙을 부모로 올리고,
자식 컴포넌트는 이벤트만 props로 내려받는 구조로 변경
