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
import ChipsTextField from '@/components/ChipsTextField';
import FileField from '@/components/FileField';
import axiosClient from '@/lib/axios';
import FormFieldArray from '@/components/FormFieldArray';
import NumberField from '@/components/NumberField';

// TODO: enum
const markets = [
  { id: 'coupangGrowth', name: '쿠팡 그로스' },
  { id: 'coupang', name: '쿠팡 일반' },
];

const productOptionDefaultValues = {
  name: '',
  growthProductOptionCode: '',
  coupangProductOptionCode: '',
  naverProductOptionCode: '',
  gmarketProductOptionCode: '',
  auctionProductOptionCode: '',
  elevenStreetProductOptionCode: '',
  growthSalesUnit: null,
  coupangSalesUnit: null,
  naverSalesUnit: null,
  gmarketSalesUnit: null,
  auctionSalesUnit: null,
  elevenStreetSalesUnit: null,
  width: '',
  height: '',
  length: '',
  weight: '',
  image: null,
  customerDeliveryFee: null,
  growthBarcode: '',
  growthBarcodeImage: null,
  warehouseSection: '',
};

function ProductAdd() {
  const createProductMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      // todo
      axiosClient.post('/products/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  });

  return (
    <Container>
      <Form
        defaultValues={{
          name: '',
          brandName: '',
          growthDisplayName: '',
          coupangDisplayName: '',
          naverDisplayName: '',
          gmarketDisplayName: '',
          auctionDisplayName: '',
          elevenStreetDisplayName: '',
          growthProductCode: '',
          coupangProductCode: '',
          naverProductCode: '',
          gmarketProductCode: '',
          auctionProductCode: '',
          elevenStreetProductCode: '',
          growthHashtags: [],
          coupangHashtags: [],
          naverHashtags: [],
          gmarketHashtags: [],
          auctionHashtags: [],
          elevenStreetHashtags: [],
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
                마켓별 노출상품명 / 상품코드
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
                          name={`${market.id}ProductName`}
                          placeholder="노출상품명"
                        />
                      </Partition.Main>
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
            <div>
              <FieldLabel>
                마켓별 상품 해시태그
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
                        <ChipsTextField
                          name={`${market.id}Hashtags`}
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
              name="seller"
              label="판매자"
            />
            <div>
              <FieldLabel>
                상품옵션
              </FieldLabel>
              <div className="space-y-2">
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
                              name={`options.${i}.image`}
                              label="옵션 이미지"
                              accept="image/*"
                            />
                            <div>
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
                                          name={`options.${i}.${market.id}Unit`}
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
                      <div className="flex justify-center pt-4">
                        <Button
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
