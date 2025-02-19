'use client';

import { useMutation } from '@tanstack/react-query';
import Container from '@/components/Container';
import TextField from '@/components/TextField';
import Form from '@/components/Form';
import Button from '@/components/Button';
import FieldLabel from '@/components/FieldLabel';
import Partition from '@/components/Partition';
import TextBlock from '@/components/TextBlock';
import RadioGroupField from '@/components/RadioGroupField';
import ToggleGroupField from '@/components/ToggleGroupField';
import FileField from '@/components/FileField';
import FormFieldArray from '@/components/FormFieldArray';
import NumberField from '@/components/NumberField';
import type {
  ProductCreateDTO,
  ProductOptionCreateDTO,
} from '@/api/data-contracts';
import { HttpClient } from '@/api/http-client';

type ProductCreateFormValues = Omit<ProductCreateDTO, 'options'> & {
  options: (Omit<ProductOptionCreateDTO, 'optionImage'| 'growthBarcodeImage'> & {
    optionImage?: File;
    growthBarcodeImage?: File;
  })[];
}

// TODO: enum
const markets = [
  { id: 'growth', name: '쿠팡 그로스' },
  { id: 'coupang', name: '쿠팡 일반' },
  { id: 'naver', name: '네이버' },
  { id: 'gmarket', name: '지마켓' },
  { id: 'auction', name: '옥션' },
  { id: 'elevenStreet', name: '11번가' },
];


const productOptionDefaultValues: ProductCreateFormValues['options'][number] = {
  name: '',
  optionImage: undefined,
  growthProductOptionCode: '',
  coupangProductOptionCode: '',
  naverProductOptionCode: '',
  gmarketProductOptionCode: '',
  auctionProductOptionCode: '',
  elevenStreetProductOptionCode: '',
  growthSalesUnit: undefined,
  coupangSalesUnit: undefined,
  naverSalesUnit: undefined,
  gmarketSalesUnit: undefined,
  auctionSalesUnit: undefined,
  elevenStreetSalesUnit: undefined,
  width: undefined,
  height: undefined,
  length: undefined,
  weight: undefined,
  customerDeliveryFee: undefined,
  growthBarcode: '',
  growthBarcodeImage: undefined,
  warehouseSection: '',
};

function ProductAdd() {
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductCreateFormValues) => {
      const { options = [], ...productData } = data;
      const formData = new FormData(); 
      formData.append(
        'dto', 
        JSON.stringify({
          ...productData,
          options: options.map(({ optionImage, growthBarcodeImage, ...option }) => ({
            ...option,
            optionImage: optionImage?.name,
            growthBarcodeImage: growthBarcodeImage?.name,
          })),
        })
      );
      options.forEach((option) => {
        if (option.optionImage) {
          formData.append('optionImages', option.optionImage)
        }
        if (option.growthBarcodeImage) {
          formData.append('growthBarcodeImages', option.growthBarcodeImage);
        }
      })
      const httpClient = new HttpClient();
      httpClient.request({
        path: '/products/create',
        method: 'POST',
        body: formData,
        format: 'formdata'
      })
    },
  });

  return (
    <Container>
      <Form<ProductCreateFormValues>
        defaultValues={{
          name: '',
          brandName: '',
          growthProductCode: '',
          coupangProductCode: '',
          naverProductCode: '',
          gmarketProductCode: '',
          auctionProductCode: '',
          elevenStreetProductCode: '',
          accountType: '',
          seasonMonths: [],
          seasonThemes: [],
          originalSeller: '',
        }}
        onSubmit={(values) => {
          createProductMutation.mutate(values);
        }}
      >
        {({ control }) => (
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
                      <Partition.Side className="w-20">
                        <TextBlock typography="body.xs">
                          {market.name}
                        </TextBlock>
                      </Partition.Side>
                      <Partition.Main>
                        <TextField
                          name={`${market.id}ProductCode`}
                          placeholder="상품코드"
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
            <ToggleGroupField
              name="seasonMonths"
              label="시즌"
              options={Array.from(Array(12)).map((_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}월`,
              }))}
              variant="outline"
              size="sm"
              fitted
              multiple
            />
            <TextField
              name="originalSeller"
              label="판매자"
            />
            <div>
              <FieldLabel>
                상품옵션
              </FieldLabel>
              <div className="space-y-4">
                <FormFieldArray
                  name="options"
                  control={control}
                >
                  {({ fields, append }) => (
                    <>
                      {
                        fields.map((field, i) => (
                          <div
                            key={field.id}
                            className="bg-gray-50 rounded-md border border-gray-300 p-3 space-y-6"
                          >
                            <TextField
                              name={`options.${i}.name`}
                              label="옵션명"
                            />
                            <FileField
                              name={`options.${i}.optionImage`}
                              label="옵션 이미지"
                              accept="image/*"
                            />
                            {/* <div>
                              <FieldLabel>
                                마켓별 옵션코드
                              </FieldLabel>
                              <div className="space-y-2">
                                {
                                  markets.map((market) => (
                                    <Partition key={market.id} space={2} valign="center">
                                      <Partition.Side className="w-20">
                                        <TextBlock typography="body.xs">
                                          {market.name}
                                        </TextBlock>
                                      </Partition.Side>
                                      <Partition.Main>
                                        <TextField
                                          name={`options.${i}.${market.id}ProductOptionCode`}
                                        />
                                      </Partition.Main>
                                    </Partition>
                                  ))
                                }
                              </div>
                            </div>
                            <div>
                              <FieldLabel>
                                판매단위
                              </FieldLabel>
                              <div className="space-y-2">
                                {
                                  markets.map((market) => (
                                    <Partition key={market.id} space={2} valign="center">
                                      <Partition.Side className="w-20">
                                        <TextBlock typography="body.xs">
                                          {market.name}
                                        </TextBlock>
                                      </Partition.Side>
                                      <Partition.Main>
                                        <NumberField
                                          name={`options.${i}.${market.id}SalesUnit`}
                                        />
                                      </Partition.Main>
                                    </Partition>
                                  ))
                                }
                              </div>
                            </div> */} 
                            <div>
                              <FieldLabel>
                                규격
                              </FieldLabel>
                              <NumberField 
                                name="width"
                                label="가로(mm)"
                              />
                              <NumberField 
                                name="length"
                                label="세로(mm)"
                              />
                              <NumberField 
                                name="height"
                                label="높이(mm)"
                              />
                              <NumberField 
                                name="weight"
                                label="무게(g)"
                              />
                            </div>
                            <NumberField 
                              name="customerDeliveryFee"
                              label="고객배송비"
                            />
                            <TextField 
                              name="warehouseSection"
                              label="창고 섹션 번호"
                            />
                          </div>
                        ))
                      }
                      <div className="bg-gray-50 rounded-md border border-gray-300 p-3 flex justify-center pt-4">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => append(productOptionDefaultValues)}
                        >
                          옵션 추가
                        </Button>
                      </div>
                    </>
                  )}
                </FormFieldArray>
              </div>
            </div>
            <div className="pt-8">
              <Button
                type="submit"
                fullWidth
              >
                상품 등록
              </Button>
            </div>
          </>
        )}
      </Form>
    </Container>
  );
}

export default ProductAdd;
