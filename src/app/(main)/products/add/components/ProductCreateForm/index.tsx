'use client';

import TextField from '@/components/TextField';
import Form from '@/components/Form';
import Button from '@/components/Button';
import FieldLabel from '@/components/FieldLabel';
import Partition from '@/components/Partition';
import TextBlock from '@/components/TextBlock';
import NumberField from '@/components/NumberField';
import RadioGroupField from '@/components/RadioGroupField';

const markets = [
  { id: 'coupangGrowth', name: '쿠팡 그로스' },
  { id: 'coupang', name: '쿠팡 일반' },
];

const productOptionDefaultValues = {
  name: '',
  marketProductOptionCode: {
    coupangGrowth: '',
    coupang: '',
  },
  unit: '',
  price: '',
  width: '',
  height: '',
  length: '',
  weight: '',
};

function ProductCreateForm() {
  return (
    <Form
      defaultValues={{
        name: '',
        brandName: '',
        marketProductCode: {
          coupangGrowth: '',
          coupang: '',
        },
        marketProductHashtags: {
          coupangGrowth: '',
          coupang: '',
        },
        accountType: '',
        seasonMonths: [],
        seasonThemes: [],
        chinaSeller: '',
        options: [productOptionDefaultValues],
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ watch, setValue }) => (
        <>
          <TextField
            name="name"
            label="상품명"
          />
          <TextField
            name="brandName"
            label="브랜드명"
          />
          <div>
            <FieldLabel>
              마켓별 상품코드
            </FieldLabel>
            <div className="space-y-2">
              {
                markets.map((market) => (
                  <Partition key={market.id} space={2} valign="center">
                    <Partition.Side className="w-1/5">
                      <TextBlock typography="body.xs">
                        {market.name}
                      </TextBlock>
                    </Partition.Side>
                    <Partition.Main>
                      <NumberField
                        name={`marketProductCode.${market.id}`}
                      />
                    </Partition.Main>
                  </Partition>
                ))
              }
            </div>
          </div>
          <RadioGroupField
            name="accountType"
            label="계정 타입"
            options={[
              { value: 'c', label: '법인' },
              { value: 'i', label: '개인' },
            ]}
          />
          <div>
            <FieldLabel>
              상품옵션
            </FieldLabel>
            <div className="space-y-2">
              {
                watch('options').map((option, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="bg-gray-100 border border-gray-300 p-3"
                  >
                    <TextField
                      name={`options.${i}.name`}
                      label="옵션명"
                    />
                    <div>
                      <FieldLabel>
                        마켓별 옵션코드
                      </FieldLabel>
                      <div className="space-y-2">
                        {
                          markets.map((market) => (
                            <Partition key={market.id} space={2} valign="center">
                              <Partition.Side className="w-1/5">
                                <TextBlock typography="body.xs">
                                  {market.name}
                                </TextBlock>
                              </Partition.Side>
                              <Partition.Main>
                                <NumberField
                                  name={`options.${i}.marketProductOptionCode.${market.id}`}
                                />
                              </Partition.Main>
                            </Partition>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex justify-center mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValue('options', [...watch('options'), productOptionDefaultValues]);
                }}
              >
                옵션 추가
              </Button>
            </div>
          </div>
          <div className="pt-8">
            <Button
              type="submit"
              fullWidth
            >
              submit
            </Button>
          </div>
        </>
      )}

    </Form>
  );
}

export default ProductCreateForm;
