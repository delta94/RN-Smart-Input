import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Validate from './ValidationWrapper';
import colors from './Colors';

type Props = {
  value: string;
  placeholder: string;
  textContentType?: 'name' | 'emailAddress' | 'username' | 'none';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'numbers-and-punctuation';
  autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'tel'
    | 'name'
    | 'postal-code';
  title: string;
  secureTextEntry?: boolean;
  onTextChange: Function;
  formType?: 'skip' | 'isEmail' | 'required' | 'isValidMobile' | 'isString' | 'retypePassword';
  showTitle?: boolean;
  isPassword?: boolean;
  password?: string;
  maxLength?: number;
  showError?: boolean;
  marginBottom?: number;
  numberOfLines?: number;
  isImportant?: boolean;
  maxWidth?: string;
  triggerFormValidations?: boolean;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  isFirstName?: boolean;
  nameTitle?: string;
  editable?: boolean;
  errorMessage: string;
};
const _AppTextInput = React.forwardRef(
  (
    {
      value,
      placeholder,
      textContentType = 'name',
      keyboardType = 'default',
      autoCompleteType = 'off',
      title = '',
      secureTextEntry = false,
      onTextChange,
      formType = 'skip',
      showTitle = true,
      isPassword = false,
      password = '',
      maxLength,
      showError = true,
      marginBottom = 30,
      numberOfLines = 1,
      isImportant = false,
      maxWidth = '100%',
      triggerFormValidations = false,
      autoCapitalize = 'none',
      isFirstName = false,
      nameTitle,
      editable = true,
      errorMessage = ''
    }: Props,
    ref,
  ) => {
    const [error, onError] = useState(' ');
    const [secureText, showPassword] = useState(secureTextEntry);
    function inputTextChange(text: any) {
      if (typeof onTextChange == 'function') {
        onTextChange(text);
      }
    }
    const forceCheckFormValidation = () => {
      onError(Validate({fieldName:title, formType, value, password,errorMessage}));
    };
    useEffect(() => {
      if (triggerFormValidations) {
        forceCheckFormValidation();
      } else {
        onError('');
      }
    }, [triggerFormValidations, title]);
    // useImperativeHandle
    React.useImperativeHandle(ref, () => ({
      error: () => {
        return error;
      },
      showError: (message = '') => {
        onError(message);
      },
    }));
    return (
      <View
        style={[
          {
            marginBottom: marginBottom,
            width: maxWidth,
          },
        ]}>
        {showTitle && (
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={style.title}>
            {title}
            {isImportant && (
              <Text allowFontScaling={false} style={[style.imp]}>{` *`}</Text>
            )}
          </Text>
        )}
        <View
          style={[
            style.inputContainer,
            {
              overflow: 'hidden',
              borderColor: error.length > 1 ? 'red' : colors.grayBackground,
            },
          ]}>
          {keyboardType === 'phone-pad' && (
            <Text allowFontScaling={false} style={style.mobile}>{`+91`}</Text>
          )}
          {isFirstName === true && (
            <Text
              allowFontScaling={false}
              style={[
                style.mobile,
                {
                  color: colors.text,
                },
              ]}>
              {nameTitle}
            </Text>
          )}
          <TextInput
            disableFullscreenUI={true}
            style={[
              {
                flex: 1,
              },
              style.input,
            ]}
            editable={editable}
            returnKeyLabel={'done'}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            secureTextEntry={secureText}
            textContentType={textContentType}
            keyboardType={keyboardType}
            autoCompleteType={autoCompleteType}
            autoCapitalize={autoCapitalize}
            textAlignVertical={'center'}
            allowFontScaling={false}
            onChangeText={(text: any) => {
              inputTextChange(text);
              onError(Validate({fieldName: title, formType, value:text, password,errorMessage}));
            }}
            onBlur={forceCheckFormValidation}></TextInput>
          {isPassword && (
            <TouchableOpacity onPress={() => showPassword(!secureText)}>
              <Image
                source={
                  secureText ? require('./eye-off.png') : require('./eye.png')
                }
                style={style.showPassword}
              />
            </TouchableOpacity>
          )}
        </View>
        {showError && (
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={style.error}>{`${error}`}</Text>
        )}
      </View>
    );
  },
);
export default memo(_AppTextInput);

const style = StyleSheet.create({
  inputContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    borderColor: colors.grayBackground,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  title: {
    paddingBottom: 5,
    fontSize: 15,
    color: colors.black,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },
  error: {
    color: 'red',
    paddingTop: 3,
    fontSize: 12,
  },
  showPassword: {
    position: 'absolute',
    right: 5,
    width: 18,
    height: 15,
    top:0
  },
  mobile: {
    fontSize: 15,
    paddingRight: 5,
  },
  imp: {
    fontSize: 15,
    color: 'red',
  },
});
